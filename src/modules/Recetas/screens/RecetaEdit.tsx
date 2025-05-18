
import React, { useState } from "react";
//import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, Modal, Alert } from "react-native";
//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { IReceta } from "../models/Receta";
import { RecetaService } from "../../../services/recetaServices";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import FormReceta from "../components/FormReceta/FormReceta";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import useRecetasService from "../hooks/useRecetasService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "RecetaEdit">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "RecetaEdit">;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export default function RecetaEdit({ navigation, route }: Props) {

  console.log('RecetaEdit route:', route.params.receta);
  const recetaParam = route.params.receta;

  const [ receta, setReceta ] = useState<IReceta>({
    id: recetaParam.id,
    nombre: recetaParam.nombre,
    cantidad: recetaParam.cantidad,
    observacion: recetaParam.observacion,
    conPicada: recetaParam.conPicada,
    picada: recetaParam.picada,
    ingredientes: recetaParam.ingredientes,
    temperatura: recetaParam.temperatura,
    tiempo: recetaParam.tiempo
  })

  const { loading, error, updateReceta, deleteReceta } = useRecetasService(false);

  const handleSave = async () => {

    let res:any = await updateReceta(receta);

    if (res?.id) {
        
    }
  }

    const handleItemRemove = async () => {
        Alert.alert(
          "Eliminar Receta",
          "¿Estás seguro que deseas eliminar esta Receta "+recetaParam.nombre+"?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Eliminar",
              style: "destructive",
              onPress: async () => {
                let res:any = await deleteReceta(receta)
                console.info(res)
                if(res?.success) refreshBack()
              },
            },
          ]
        );
    }

    const refreshBack = () => {
        navigation.goBack();
        route.params.onRefresh();
    }

  const handleChange = (data: InputType) => {
    const { name, value } = data;
    setReceta({ ...receta, [name]: value });
  };
    
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <HeaderModule title="Información Receta" iconStart="right" onPressStart={()=>navigation.goBack()} iconEnd="delete" onPressEnd={()=>handleItemRemove()}/>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>

          <FormReceta
            onPress={() => handleSave()}
            receta={receta}
            loading={loading}
            handleChange={handleChange}
          /> 
        </ScrollView>

        <View style={{ marginVertical: 10 }} />


    </View>
  );
}
