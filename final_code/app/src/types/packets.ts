export type VestMode = "ACTIVE" | "BRACE" | "KILLED" | "RELEASING";

export type PosturePacket = {
  s1: number;
  posture: string;
  mode?: VestMode;
  kill?: boolean;
  moveAmount?: number;
  slouchThreshold1?: number;
  motorActuated?: boolean;
  raw?: string;
};

export type CommandPacket =
  | {
      type: "SET_MODE";
      mode: VestMode;
    }
  | {
      type: "SET_MOVE_AMOUNT";
      amount: number;
    }
  | {
      type: "SET_SLOUCH_THRESHOLD";
      threshold: number;
    }
  | {
      type: "PING";
    };