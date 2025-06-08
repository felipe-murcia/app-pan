import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import useGetProducto from "../../hooks/useGetProducto";


interface ModalProductoProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (producto: any) => void;
}

const ModalProducto: React.FC<ModalProductoProps> = ({ visible, onClose, onSelect }) => {

  const { productos, loading } = useGetProducto();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} >
                <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          <Text style={styles.title}>Selecciona un producto</Text>
          {loading ? (
            <Text>Cargando productos...</Text>
          ) : (
            <FlatList
              data={productos}
              keyExtractor={(item) => item?.id?.toString() || "0"}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={styles.itemText}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
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
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    fontFamily: "PoppinsLight",
  },
  closeBtn: {
    marginTop: 15,
    alignSelf: "center",
    padding: 10,
  },
  closeText: {
    color: "#f44336",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    textAlign: "right",
  },
});

export default ModalProducto;