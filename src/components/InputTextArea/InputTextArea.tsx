import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface InputTextAreaProps {
  label?: string; // Etiqueta opcional para el TextArea
  placeholder?: string; // Placeholder opcional
  value: string; // Valor del TextArea
  onChangeText: (text: string) => void; // Función para manejar cambios
  numberOfLines?: number; // Número de líneas visibles
}

export default function InputTextArea({
  label,
  placeholder,
  value,
  onChangeText,
  numberOfLines = 4,
}: InputTextAreaProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.textArea, { height: numberOfLines * 20 }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
    fontFamily: "PoppinsLight",
  },
  textArea: {
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 18,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontFamily: "PoppinsLight",
    shadowOpacity: 0.1,
  },
});