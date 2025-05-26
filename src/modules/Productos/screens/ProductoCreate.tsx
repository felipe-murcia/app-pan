
import React, { useState } from "react";
import { Text, View, ScrollView, Modal } from "react-native";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import useProductosService from "../hooks/useProductoService";
import FormProducto from "../components/FormProducto/FormProducto";
import { IProducto } from "../models/Producto";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "RecetaCreate">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "RecetaCreate">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function ProductoCreate({ navigation, route }: Props) {

  const [ producto, setReceta ] = useState<IProducto>({
    nombre:'',
    precio:0,
    cantidad: 0,
    observacion: '',
    disponible: false
  })
  
  const { loading, error, saveProducto } = useProductosService(false);

  const handleSave = async () => {

    let res:any = await saveProducto(producto);

    if (res?.id) {
        navigation?.goBack();
        route?.params?.onRefresh();
    }
  }

    const handleChange = (data: InputType) => {
      const { name, value } = data;
      setReceta({ ...producto, [name]: value });
    };
    
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <HeaderModule title="Formulario" iconEnd="close" onPressEnd={()=>navigation?.goBack()}/>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>

          <FormProducto
            onPress={handleSave}
            producto={producto}
            loading={loading}
            handleChange={handleChange}
          />
         
        </ScrollView>

        <View style={{ marginVertical: 10 }} />

       

        
    </View>
  );
}
