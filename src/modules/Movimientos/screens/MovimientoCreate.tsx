
import React, { useState } from "react";
import { Text, View, ScrollView, Modal } from "react-native";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import FormMovimiento from "../components/FormMovimiento/FormMovimiento";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrdenCreate">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "OrdenCreate">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function MovimientoCreate({ navigation, route }: Props) {
  
  const handleSave = async () => {
    navigation?.goBack();
    route?.params?.onRefresh();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderModule title="Crear movimiento" iconEnd="close" onPressEnd={()=>navigation?.goBack()}/>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>        
          <FormMovimiento onSuccess={handleSave} />
        </ScrollView>
        <View style={{ marginVertical: 10 }} />
    </View>
  );
}
