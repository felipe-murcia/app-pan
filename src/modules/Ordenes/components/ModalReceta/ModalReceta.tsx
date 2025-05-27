import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import useGetProducto from "../../hooks/useGetProducto";
import useGetReceta from "../../hooks/useGetReceta";
import { IReceta } from '../../../Recetas/models/Receta';


interface ModalRecetaProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (receta: any) => void;
}

const ModalReceta: React.FC<ModalRecetaProps> = ({ visible, onClose, onSelect }) => {

  const { recetas, loading } = useGetReceta();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} >
                <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          <Text style={styles.title}>Selecciona una receta</Text>
          {loading ? (
            <Text>Cargando recetas...</Text>
          ) : (
            <FlatList
              data={recetas}
              keyExtractor={(item) => item?.id?.toString() || "0"}
              renderItem={({ item }: { item: IReceta }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Text style={[styles.itemText, { fontFamily:'PoppinsMedium'}]}>#{item.id} {item.nombre}</Text>
                  <Text style={styles.itemText}>Tiempo: {item.tiempo} min - Temp.: {item.temperatura} °C</Text>
                  <Text style={styles.itemText}>{item.ingredientes?.length} Ingredientes</Text>
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
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
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

export default ModalReceta;