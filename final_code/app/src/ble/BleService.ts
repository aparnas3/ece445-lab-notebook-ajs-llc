import { CommandPacket, PosturePacket } from "../types/packets";

export type DeviceSummary = {
  id: string;
  name: string;
};

export type LogFn = (message: string) => void;
export type DataFn = (packet: PosturePacket) => void;
export type ConnectionFn = (connected: boolean) => void;

export interface BleService {
  initialize(): Promise<void>;
  startScan(onDeviceFound: (device: DeviceSummary) => void): Promise<void>;
  stopScan(): void;
  connect(deviceId: string): Promise<void>;
  disconnect(): Promise<void>;
  sendCommand(command: CommandPacket): Promise<void>;
  setDataHandler(handler: DataFn): void;
  setConnectionHandler(handler: ConnectionFn): void;
  setLogger(logger: LogFn): void;
  cleanup(): void;
}