import { colorPrimary, colorPrimaryDark } from "@/constant/color";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

interface ButtonProps {
  title: string; // Texto del botón
  onPress: () => void; // Función que se ejecuta al presionar el botón
  style?: ViewStyle; // Estilo opcional para personalizar el botón
  disabled?: boolean; // Deshabilitar el botón
  color?: string; // Color del botón
}

export default function ButtonDashed({ title, onPress, style, disabled = false, color = colorPrimary }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderColor: colorPrimaryDark,
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  text: {
    color: colorPrimaryDark,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});