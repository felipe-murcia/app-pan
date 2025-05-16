import React from "react";
import { View, Text, Modal } from "react-native";
import InputText from "../../../../components/InputText/InputText";
import Button from "../../../../components/Button/Button";
import { IIngrediente } from "../../models/Receta";
import RadioButton from "../../../../components/RadioButton/RadioButton";

interface Props {
  show: boolean;
  onHandleSave: (value: IIngrediente) => void;
  setModalVisible: (value: boolean) => void;
}

export default function FormIngrediente({
  onHandleSave,
  show,
  setModalVisible,
}: Props) {
  const [ingrediente, setIngrediente] = React.useState<IIngrediente>({
    nombre: "",
    cantidad: 0,
    tipoDeUnidad: "gr",
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setModalVisible(!show);
      }}
    >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 }}>
      <View style={{ width: "90%", backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Agregar ingrediente
        </Text>
        <Text>
            Agregar ingrediente a la receta, puedes agregar varios ingredientes
            para una receta.
        </Text>
        <InputText
          onChangeText={(value: string) =>
            setIngrediente({ ...ingrediente, nombre: value })
          }
          value={ingrediente.nombre}
          label="Nombre"
          placeholder="Nombre del ingrediente"
        />
        <InputText
          onChangeText={(value: number) =>
            setIngrediente({ ...ingrediente, cantidad: value })
          }
          value={ingrediente.cantidad}
          label="Cantidad"
          placeholder="Cantidad"
          keyboardType="numeric"
        />

        <RadioButton
          name="Tipo de unidad"
          options={[
            { value: "gr", label: "Gramos" },
            { value: "cda", label: "Cucharadas" },
            { value: "ml", label: "Mililitros" },
            { value: "und", label: "Unidad" },
          ]}
          selectedKey={ingrediente.tipoDeUnidad}
          onChange={(key) => setIngrediente({ ...ingrediente, tipoDeUnidad: key })}
        />
        <Button
          title="Agregar"
          onPress={() => onHandleSave(ingrediente)}
          style={{ marginTop: 20 }}
        />
      </View>

        </View>
    </Modal>
  );
}
