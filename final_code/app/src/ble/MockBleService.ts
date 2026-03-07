import { BleService, ConnectionFn, DataFn, DeviceSummary, LogFn } from "./BleService";
import { CommandPacket, PosturePacket } from "../types/packets";

export class MockBleService implements BleService {
  private logger: LogFn = () => {};
  private onData: DataFn = () => {};
  private onConnection: ConnectionFn = () => {};
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private connected = false;

  async initialize(): Promise<void> {
    this.logger("Mock BLE initialized");
  }

  async startScan(onDeviceFound: (device: DeviceSummary) => void): Promise<void> {
    this.logger("Mock scan started");
    setTimeout(() => {
      onDeviceFound({ id: "mock-device-1", name: "APCV Mock Device" });
      this.logger("Mock device found: APCV Mock Device");
    }, 500);
  }

  stopScan(): void {
    this.logger("Mock scan stopped");
  }

  async connect(deviceId: string): Promise<void> {
    this.connected = true;
    this.onConnection(true);
    this.logger(`Mock connected to ${deviceId}`);

    let tick = 0;
    this.intervalId = setInterval(() => {
      tick += 1;
      const posture = tick % 8 < 5 ? "good" : "slouch";

      const packet: PosturePacket = {
        s1: posture === "good" ? 620 + (tick % 12) : 710 + (tick % 10),
        s2: posture === "good" ? 605 + (tick % 10) : 690 + (tick % 12),
        posture,
        battery: 7.4,
        raw: "mock",
      };

      this.onData(packet);
    }, 1000);
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.onConnection(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.logger("Mock disconnected");
  }

  async sendCommand(command: CommandPacket): Promise<void> {
    this.logger(`Mock command sent: ${JSON.stringify(command)}`);
  }

  setDataHandler(handler: DataFn): void {
    this.onData = handler;
  }

  setConnectionHandler(handler: ConnectionFn): void {
    this.onConnection = handler;
  }

  setLogger(logger: LogFn): void {
    this.logger = logger;
  }

  cleanup(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }
}