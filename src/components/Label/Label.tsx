import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface LabelProps {
  label?: string; // Etiqueta opcional para el input
}

export default function Label({
  label
}: LabelProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
    fontFamily: "PoppinsLight",
  },
  input: {
    //height: 40,
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "PoppinsLight",
    shadowOpacity: 0.1,
  },
});