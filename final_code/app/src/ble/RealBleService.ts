import { BleManager, Device, Subscription } from "react-native-ble-plx";
import { decode as atob, encode as btoa } from "base-64";
import { COMMAND_CHAR_UUID, DATA_CHAR_UUID, DEVICE_NAME_HINT, SERVICE_UUID } from "./uuids";
import { CommandPacket, PosturePacket } from "../types/packets";
import { requestBlePermissions } from "./permissions";
import { DeviceSummary } from "./BleService";

type LogFn = (message: string) => void;
type DataFn = (data: PosturePacket) => void;
type ConnectionFn = (connected: boolean) => void;

export class RealBleService {
  private manager = new BleManager();
  private logger: LogFn = () => {};
  private onData: DataFn = () => {};
  private onConnection: ConnectionFn = () => {};
  private connectedDevice: Device | null = null;
  private notifySub: Subscription | null = null;
  private scanActive = false;
  private partialBuffer = "";


  setLogger(fn: LogFn) {
    this.logger = fn;
  }

  setOnData(fn: DataFn) {
    this.onData = fn;
  }

  setOnConnection(fn: ConnectionFn) {
    this.onConnection = fn;
  }

  async initialize(): Promise<void> {
    const granted = await requestBlePermissions();

    if (!granted) {
      this.logger("BLE permissions not granted");
      return;
    }

    this.logger("BLE initialized");
  }

  async startScan(onDeviceFound: (device: DeviceSummary) => void): Promise<void> {
    if (this.scanActive) {
      return;
    }

    this.scanActive = true;
    this.logger("Scanning for APCV...");

    const seen = new Set<string>();

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        this.logger(`Scan error: ${error.message}`);
        return;
      }

      if (!device?.id) return;

      const name = device.name || device.localName || "Unnamed device";
      const matchesName = name.toLowerCase().includes(DEVICE_NAME_HINT.toLowerCase());

      if (matchesName && !seen.has(device.id)) {
        seen.add(device.id);
        this.logger(`Found device: ${name}`);
        onDeviceFound({ id: device.id, name });
      }
    });
  }

  stopScan(): void {
    this.manager.stopDeviceScan();
    this.scanActive = false;
    this.logger("BLE scan stopped");
  }

  async connect(deviceId: string): Promise<void> {
    this.stopScan();

    try {
      this.logger(`Connecting to ${deviceId}...`);

      const device = await this.manager.connectToDevice(deviceId, {
        autoConnect: false,
      });

      await device.requestMTU(512);

      this.connectedDevice = await device.discoverAllServicesAndCharacteristics();

      this.onConnection(true);
      this.logger(`Connected to ${this.connectedDevice.name || this.connectedDevice.id}`);

      this.startNotifications(this.connectedDevice);
    } catch (e: any) {
      this.logger(`Connection failed: ${e.message}`);
      this.onConnection(false);
    }
  }

  private startNotifications(device: Device) {
    this.notifySub = device.monitorCharacteristicForService(
      SERVICE_UUID,
      DATA_CHAR_UUID,
      (error, characteristic) => {
        if (error) {
          this.logger(`Notification error: ${error.message}`);
          return;
        }

        if (!characteristic?.value) return;

        try {
          const decodedRaw = atob(characteristic.value).replace(/\0/g, "").trim();
          this.logger(`RX raw: ${decodedRaw}`);

          const start = decodedRaw.indexOf("{");
          const end = decodedRaw.lastIndexOf("}");

          if (start === -1 || end === -1 || end <= start) {
            throw new Error(`No complete JSON found: ${decodedRaw}`);
          }

          const jsonText = decodedRaw.substring(start, end + 1);
          this.logger(`RX json: ${jsonText}`);

          const parsed = JSON.parse(jsonText);

          const packet: PosturePacket = {
            s1: Number(parsed.s1 ?? 0),
            posture: String(parsed.posture ?? "unknown"),
            mode: parsed.mode,
            kill: parsed.kill === 1 || parsed.kill === true || parsed.mode === "KILLED",
            moveAmount:
              parsed.moveAmount !== undefined ? Number(parsed.moveAmount) : undefined,
            slouchThreshold1:
              parsed.slouchThreshold1 !== undefined
                ? Number(parsed.slouchThreshold1)
                : undefined,
            motorActuated:
              parsed.motorActuated !== undefined
                ? parsed.motorActuated === 1 || parsed.motorActuated === true
                : undefined,
            raw: decodedRaw,
          };

          this.onData(packet);
        } catch (e: any) {
            this.logger(`Parse error: ${e.message}`);

            this.onData({
              s1: 0,
              posture: "PARSE_ERROR",
              kill: false,
              raw: characteristic.value,
            });
}
      }
    );
  }

  async sendCommand(command: CommandPacket): Promise<void> {
    if (!this.connectedDevice) {
      this.logger("No APCV device connected");
      return;
    }

    try {
      const payload = JSON.stringify(command);

      await this.connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        COMMAND_CHAR_UUID,
        btoa(payload)
      );

      this.logger(`TX: ${payload}`);
    } catch (e: any) {
      this.logger(`Command failed: ${e.message}`);
    }
  }

  async disconnect(): Promise<void> {
    this.notifySub?.remove();
    this.notifySub = null;

    if (this.connectedDevice) {
      await this.connectedDevice.cancelConnection();
      this.connectedDevice = null;
    }

    this.onConnection(false);
    this.logger("Disconnected");
  }

  cleanup(): void {
    this.stopScan();

    if (this.notifySub) {
      this.notifySub.remove();
      this.notifySub = null;
    }

    this.manager.destroy();
  }
}