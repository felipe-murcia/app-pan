import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface InputToggleProps {
  label?: string; // Etiqueta opcional para el toggle
  value: boolean; // Valor actual del toggle
  onValueChange: (value: boolean) => void; // Función para manejar cambios
}

export default function InputToggle({ label, value, onValueChange }: InputToggleProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? "#4caf50" : "#f44336"}
        trackColor={{ false: "#ccc", true: "#81c784" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
    fontFamily: "PoppinsLight",
  },
});