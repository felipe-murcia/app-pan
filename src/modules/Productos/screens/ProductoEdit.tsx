
import React, { useState } from "react";
import { Text, View, ScrollView, Modal, Alert } from "react-native";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import FormProducto from "../components/FormProducto/FormProducto";
import useProductosService from "../hooks/useProductoService";
import { IProducto } from "../models/Producto";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductoEdit">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "ProductoEdit">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function ProductoEdit({ navigation, route }: Props) {

  console.log('ProductoEdit route:', route?.params?.producto);
  const productParam = route?.params?.producto as IProducto;

  const [ producto, setProducto ] = useState<IProducto>({
    id: productParam.id,
    nombre: productParam.nombre,
    precio: productParam.precio,
    cantidad: productParam.cantidad,
    disponible: productParam.disponible,
    observacion: productParam.observacion
  })

  const { loading, error, updateProducto, deleteProducto } = useProductosService(false);

  const handleSave = async () => {

    let res:any = await updateProducto(producto);

    if (res?.id) refreshBack()
  }

    const handleItemRemove = async () => {
        Alert.alert(
          "Eliminar Receta",
          "¿Estás seguro que deseas eliminar este Producto "+productParam.nombre+"?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Eliminar",
              style: "destructive",
              onPress: async () => {
                let res:any = await deleteProducto(producto)
                console.info(res)
                if(res?.success) refreshBack()
              },
            },
          ]
        );
    }

    const refreshBack = () => {
        navigation?.goBack();
        route?.params?.onRefresh?.();
    }

  const handleChange = (data: InputType) => {
    const { name, value } = data;
    setProducto({ ...producto, [name]: value });
  };
    
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <HeaderModule title="Información Prod." iconStart="right" onPressStart={()=>navigation?.goBack()} iconEnd="delete" onPressEnd={()=>handleItemRemove()}/>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>

          <FormProducto
            onPress={() => handleSave()}
            producto={producto}
            loading={loading}
            handleChange={handleChange}
          /> 
        </ScrollView>

        <View style={{ marginVertical: 10 }} />


    </View>
  );
}
