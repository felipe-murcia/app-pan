
import React, { useState } from "react";
import { Text, View, ScrollView, Modal } from "react-native";
import { IReceta } from "../models/Receta";
import { RecetaService } from "../../../services/recetaServices";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import FormReceta from "../components/FormReceta/FormReceta";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import useValidateForm from "../hooks/useValidateForm";
import useRecetasService from "../hooks/useRecetasService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "RecetaCreate">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "RecetaCreate">;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export default function RecetaCreate({ navigation, route }: Props) {

  const [ receta, setReceta ] = useState<IReceta>({
    nombre:'',
    cantidad: 0,
    observacion: '',
    conPicada: false,
    picada: 0,
    ingredientes: [],
    temperatura:0,
    tiempo:0
  })
  
  const { loading, error, saveReceta } = useRecetasService(false);

  const handleSave = async () => {

    let res:any = await saveReceta(receta) || true;

    if (res?.id) {
        navigation.goBack();
        route.params.onRefresh();
    }
  }

    const handleChange = (data: InputType) => {
      const { name, value } = data;
      setReceta({ ...receta, [name]: value });
    };
    
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <HeaderModule title="Formulario" iconEnd="close" onPressEnd={()=>navigation.goBack()}/>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>

          <FormReceta
            onPress={handleSave}
            receta={receta}
            loading={loading}
            handleChange={handleChange}
          />
         
        </ScrollView>

        <View style={{ marginVertical: 10 }} />

       

        
    </View>
  );
}
