import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RealBleService } from "../ble/RealBleService";
import { DeviceSummary } from "../ble/BleService";
import { VestMode } from "../types/packets";

export default function HomeScreen() {
  //const ble = useMemo(() => new RealBleService(), []);
  const bleRef = useRef<RealBleService | null>(null);
  if (!bleRef.current) {
    bleRef.current = new RealBleService();
  }
  const ble = bleRef.current

  const [connected, setConnected] = useState(false);
  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [deviceName, setDeviceName] = useState("None");

  const [sensor1, setSensor1] = useState(0);
  const [posture, setPosture] = useState("unknown");
  const [mode, setMode] = useState<VestMode>("ACTIVE");
  const [moveAmount, setMoveAmount] = useState(8000);
  const [killActive, setKillActive] = useState(false);

  const [slouchThreshold1, setSlouchThreshold1] = useState(425);
  const [thresholdInput, setThresholdInput] = useState("425");

  const [logs, setLogs] = useState<string[]>([]);

  function addLog(message: string) {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${message}`, ...prev].slice(0, 12));
  }

  useEffect(() => {
    ble.setLogger(addLog);

    ble.setOnConnection((isConnected) => {
      setConnected(isConnected);
    });

    ble.setOnData((packet) => {
      setSensor1(packet.s1);
      setPosture(packet.posture);

      if (packet.kill !== undefined) {
        setKillActive(packet.kill);
      }

      if (packet.mode) {
        setMode(packet.mode);
      }

      if (packet.moveAmount !== undefined) {
        setMoveAmount(packet.moveAmount);
      }

      if (packet.slouchThreshold1 !== undefined) {
        setSlouchThreshold1(packet.slouchThreshold1);
        setThresholdInput(String(packet.slouchThreshold1));
      }
    });

    ble.initialize().catch((e) => {
      addLog(`Init error: ${e.message}`);
    });

    return () => {
      ble.cleanup();
    };
  }, [ble]);

  async function scanForDevice() {
    setDevices([]);

    try {
      await ble.startScan((device) => {
        setDevices((prev) =>
          prev.some((d) => d.id === device.id) ? prev : [...prev, device]
        );
      });
    } catch (e) {
      addLog(`Scan error: ${(e as Error).message}`);
    }
  }

  async function connectToDevice(device: DeviceSummary) {
    try {
      setDeviceName(device.name);
      await ble.connect(device.id);
    } catch (e) {
      addLog(`Connect error: ${(e as Error).message}`);
    }
  }

  async function disconnectDevice() {
    try {
      await ble.disconnect();
      setDeviceName("None");
    } catch (e) {
      addLog(`Disconnect error: ${(e as Error).message}`);
    }
  }

  async function setVestMode(newMode: VestMode) {
    try {
      await ble.sendCommand({
        type: "SET_MODE",
        mode: newMode,
      });

      setMode(newMode);
      addLog(`Requested mode: ${newMode}`);
    } catch (e) {
      addLog(`Command error: ${(e as Error).message}`);
    }
  }

  async function sendMoveAmount(newAmount: number) {
    const safeAmount = Math.max(0, Math.min(12000, newAmount));

    try {
      await ble.sendCommand({
        type: "SET_MOVE_AMOUNT",
        amount: safeAmount,
      });

      setMoveAmount(safeAmount);
      addLog(`Requested move amount: ${safeAmount}`);
    } catch (e) {
      addLog(`Move amount error: ${(e as Error).message}`);
    }
  }

  async function sendSlouchThreshold() {
    const parsed = Number(thresholdInput);

    if (Number.isNaN(parsed)) {
      addLog("Threshold must be a number");
      return;
    }

    const safeThreshold = Math.max(0, Math.min(4095, Math.round(parsed)));

    try {
      await ble.sendCommand({
        type: "SET_SLOUCH_THRESHOLD",
        threshold: safeThreshold,
      });

      setSlouchThreshold1(safeThreshold);
      setThresholdInput(String(safeThreshold));
      addLog(`Requested threshold: ${safeThreshold}`);
    } catch (e) {
      addLog(`Threshold error: ${(e as Error).message}`);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>APCV App</Text>
        <Text style={styles.subtitle}>Posture vest control panel</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Connection</Text>
          <Text>Status: {connected ? "Connected" : "Disconnected"}</Text>
          <Text>Device: {deviceName}</Text>

          <TouchableOpacity style={styles.button} onPress={scanForDevice}>
            <Text style={styles.buttonText}>Scan for APCV</Text>
          </TouchableOpacity>

          {connected && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={disconnectDevice}
            >
              <Text style={styles.secondaryButtonText}>Disconnect</Text>
            </TouchableOpacity>
          )}

          {devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={styles.deviceButton}
              onPress={() => connectToDevice(device)}
            >
              <Text style={styles.deviceText}>Connect to {device.name}</Text>
              <Text style={styles.deviceId}>{device.id}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.card, killActive && styles.killCard]}>
          <Text style={styles.sectionTitle}>Live Data</Text>

          <Text style={killActive ? styles.killText : styles.safeText}>
            Kill Switch: {killActive ? "ACTIVE" : "Inactive"}
          </Text>

          <Text>Sensor 1: {sensor1}</Text>
          <Text>Posture: {posture}</Text>
          <Text>Mode: {mode}</Text>
          <Text>Move Amount: {moveAmount}</Text>
          <Text>Slouch Threshold: {slouchThreshold1}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Controls</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "BRACE" && styles.selectedButton,
              ]}
              onPress={() => setVestMode("BRACE")}
            >
              <Text style={styles.buttonText}>Brace Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "ACTIVE" && styles.selectedButton,
              ]}
              onPress={() => setVestMode("ACTIVE")}
            >
              <Text style={styles.buttonText}>Active Mode</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subsectionTitle}>Motor Target</Text>
          <Text>Current Move Amount: {moveAmount}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.modeButton}
              onPress={() => sendMoveAmount(moveAmount - 500)}
            >
              <Text style={styles.buttonText}>-500</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modeButton}
              onPress={() => sendMoveAmount(moveAmount + 500)}
            >
              <Text style={styles.buttonText}>+500</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.subsectionTitle}>Slouch Threshold</Text>
          <Text>Current Threshold: {slouchThreshold1}</Text>

          <TextInput
            style={styles.input}
            value={thresholdInput}
            onChangeText={setThresholdInput}
            keyboardType="number-pad"
            placeholder="Enter threshold 0-4095"
          />

          <TouchableOpacity style={styles.button} onPress={sendSlouchThreshold}>
            <Text style={styles.buttonText}>Set Threshold</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Lower threshold makes slouch detection easier to trigger. Range:
            0–4095.
          </Text> */}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Event Log</Text>

          {logs.length === 0 ? (
            <Text>No events yet.</Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  killCard: {
    borderColor: "red",
    backgroundColor: "#ffe5e5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  secondaryButtonText: {
    color: "#111",
    fontWeight: "600",
    textAlign: "center",
  },
  deviceButton: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    gap: 3,
  },
  deviceText: {
    fontWeight: "600",
  },
  deviceId: {
    fontSize: 11,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  modeButton: {
    flex: 1,
    backgroundColor: "#555",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "#111",
  },
  helperText: {
    fontSize: 12,
    color: "#555",
  },
  logText: {
    fontSize: 12,
    marginBottom: 4,
  },
  killText: {
    color: "red",
    fontWeight: "700",
    fontSize: 18,
  },
  safeText: {
    color: "green",
    fontWeight: "600",
  },
});