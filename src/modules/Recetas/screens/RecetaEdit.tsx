
import React, { useState } from "react";
//import { Stack, useRouter } from "expo-router";
import { Text, View, ScrollView, Modal } from "react-native";
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

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "RecetaEdit">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "RecetaEdit">;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export default function RecetaEdit({ navigation, route }: Props) {

  //const router = useRouter();

  console.log('RecetaEdit route:', route.params.receta);
  const recetaParam = route.params.receta;

  console.log('Ingreeee 00000 :', recetaParam.ingredientes);
  const [ loading, setLoading ] = useState(false);

  const [ receta, setReceta ] = useState<IReceta>({
    nombre: recetaParam.nombre,
    cantidad: recetaParam.cantidad,
    observacion: recetaParam.observacion,
    conPicada: recetaParam.conPicada,
    picada: recetaParam.picada,
    //ingredientes: recetaParam.ingredientes,
    ingredientes: [],
    temperatura: recetaParam.temperatura,
    tiempo: recetaParam.tiempo
  })
  const [modalVisible, setModalVisible] = React.useState(false);
  const [ingredientes, setIngredientes] = React.useState<{ nombre: string; cantidad: string }[]>([]);
  const [ingrediente, setIngrediente] = React.useState<{ nombre: string; cantidad: string }>({ nombre: "", cantidad: "" });

  const handleSaveIngredient = () => {
    if (ingrediente.nombre && ingrediente.cantidad) {
      setIngredientes([...ingredientes, { ...ingrediente }]);
      setIngrediente({ nombre: "", cantidad: "" });
      setModalVisible(false);
    }
  };

  const handleSave = async () => {
    
    try {
      console.log('Inicia proceso:');
      setLoading(true);
      const recetaService = new RecetaService();
      const savedReceta = await recetaService.create(receta);
      if (!savedReceta) alert('Exito al guardar la receta');
      console.log('Receta saved:', savedReceta);
    } catch (error) {
      console.error('Error saving receta:', error);
    } finally {
      setLoading(false);
    }
  }

    const handleChange = (data: InputType) => {
      const { name, value } = data;
      setReceta({ ...receta, [name]: value });
    };
    
  return (
    <View style={{ flex: 1, padding: 20 }}>

      <HeaderModule title="Información Receta" iconEnd="close" onPressEnd={()=>{}}/>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>

          <FormReceta
            onPress={() => {}}
            receta={receta}
            loading={loading}
            handleChange={handleChange}
          /> 
        </ScrollView>

        <View style={{ marginVertical: 10 }} />


    </View>
  );
}
