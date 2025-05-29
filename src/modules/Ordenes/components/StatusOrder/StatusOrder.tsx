import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

interface StatusOrderProps {
  status: number;
}

const statusSteps: { key: number; label: string; icon: string; image: any }[] = [
  { key: 1, label: "Pendiente", icon: "hourglass-empty", image: require("../../image/pending.png") },
  { key: 2, label: "En proceso", icon: "autorenew", image: require("../../image/in-progress.png") },
  { key: 3, label: "Finalizado", icon: "check-circle", image: require("../../image/completed.png") },
];

const getStatusIndex = (status: number) => statusSteps.findIndex((s) => s.key === status);

const StatusOrder: React.FC<StatusOrderProps> = ({ status }) => {

  const activeIndex = getStatusIndex(status);

  return (
    <View>

    <View style={styles.container}>
      {statusSteps.map((step, idx) => (
        <React.Fragment key={step.key}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                idx <= activeIndex && styles.circleActive,
              ]}
            >
              <Image
                source={step.image}
                style={{ width: 32, height: 32, tintColor: idx <= activeIndex ? "#fff" : "#bbb" }}
                />
            </View>
            <Text
              style={[
                styles.label,
                idx <= activeIndex && styles.labelActive,
              ]}
            >
              {step.label}
            </Text>
          </View>
          {idx < statusSteps.length - 1 && (
            <View
              style={[
                styles.line,
                idx < activeIndex && styles.lineActive,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
    justifyContent: "center",
  },
  stepContainer: {
    alignItems: "center",
    width: 70,
    backgroundColor: "transparent",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#bbb",
  },
  circleActive: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  label: {
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
    fontFamily: "PoppinsLight",
  },
  labelActive: {
    color: "#4caf50",
    fontFamily: "PoppinsMedium",
  },
  line: {
    height: 4,
    width: 52,
    backgroundColor: "#eee",
    marginBottom: 24,
    borderRadius: 2,
  },
  lineActive: {
    backgroundColor: "#4caf50",
  },
});

export default StatusOrder;