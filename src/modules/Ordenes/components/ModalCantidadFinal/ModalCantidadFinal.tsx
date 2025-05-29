import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface ModalCantidadFinalProps {
  visible: boolean;
  descripcion?: string;
  onClose: () => void;
  onSave: (cantidad: number) => void;
}

const ModalCantidadFinal: React.FC<ModalCantidadFinalProps> = ({
  visible,
  descripcion = "Ingrese la cantidad final de producción",
  onClose,
  onSave,
}) => {
  const [cantidad, setCantidad] = useState<string>("");

  const handleSave = () => {
    const value = parseInt(cantidad, 10);
    if (!isNaN(value)) {
      onSave(value);
      setCantidad("");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.descripcion}>{descripcion}</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad final"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
  },
  descripcion: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 18,
    fontFamily: "PoppinsLight",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 4,
    padding: 6,
  },
  closeText: {
    color: "#f44336",
    fontFamily: "PoppinsLight",
    fontSize: 15,
  },
});

export default ModalCantidadFinal;