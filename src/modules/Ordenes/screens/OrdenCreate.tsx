
import React, { useState } from "react";
import { Text, View, ScrollView, Modal } from "react-native";
// import { IReceta } from "../models/Receta";
import { RecetaService } from "../../../services/recetaServices";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
// import FormReceta from "../components/FormReceta/FormReceta";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
// import useValidateForm from "../hooks/useValidateForm";
// import useRecetasService from "../hooks/useRecetasService";
import { IProducto } from "../../Productos/models/Producto";
import { IOrden } from "../models/Orden";
import useRecetasService from "../../Recetas/hooks/useRecetasService";
import FormOrden from "../components/FormOrden/FormOrden";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrdenCreate">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "OrdenCreate">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function OrdenCreate({ navigation, route }: Props) {
  
  const handleSave = async () => {
    navigation?.goBack();
    route?.params?.onRefresh();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderModule title="Crear orden" iconEnd="close" onPressEnd={()=>navigation?.goBack()}/>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>        
          <FormOrden onSuccess={handleSave} />
        </ScrollView>
        <View style={{ marginVertical: 10 }} />
    </View>
  );
}
