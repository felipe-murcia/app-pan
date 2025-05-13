import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface InputTextProps {
  label?: string; // Etiqueta opcional para el input
  placeholder?: string; // Placeholder opcional
  value: string | number | any ; // Valor del input
  onChangeText: (text: any) => void; // Función para manejar cambios
  secureTextEntry?: boolean; // Para entradas de tipo contraseña
  keyboardType?: "default" | "numeric" | "email-address"; // Tipo de teclado
}

export default function InputText({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputTextProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
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