
import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Alert } from "react-native";
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
import { EstadoBadge } from "../components/EstadoBadge/EstadoBadge";
import globalStyles from "../../../styles/globalStyles";
import { IIngrediente } from "../../Recetas/models/Receta";
import Button from "../../../components/Button/Button";
import useOrdenService from "../hooks/useOrdenService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrdenDetailsAdmin">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "OrdenDetailsAdmin">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function OrdenDetailsAdmin({ navigation, route }: Props) {

  console.log('RecetaEdit route:', route?.params?.orden);
  const ordenParam = route?.params?.orden as IOrden;

  const { updateOrden, loading } = useOrdenService();

  const handleCancel = async () => {
    const data: IOrden = {
      ...ordenParam,
      estado: 4, // Estado 4 es "Cancelada"
    };
    let res = await updateOrden(data);
    if (res) {
      navigation?.goBack();
      route?.params?.onRefresh();
    }
  }

  const confirmCancel = () => {
    Alert.alert(
      "Confirmar Cancelación",
      "¿Estás seguro de que deseas cancelar esta orden?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Aceptar", onPress: handleCancel },
      ],
      { cancelable: false }
    );
  }

  let { producto, receta, cantidadInicial, cantidadFinal, estado } = ordenParam || {};

  const ingredientes = receta?.ingredientes ? JSON.parse(receta.ingredientes.toString()) : [];

  console.log('OrdenDetailsAdmin ingredientes:', ingredientes);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderModule title="Detalles" iconEnd="close" onPressEnd={()=>navigation?.goBack()}/>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>        
          <View style={{alignItems:'flex-start',paddingTop:10, backgroundColor:'#fff', borderRadius:10, padding:10}}>
            
          <View style={[globalStyles.flexCenter,{ justifyContent:'space-between', width:'100%' }]}>
            <Text style={styles.title}>Orden #{ordenParam?.id}</Text>
            <EstadoBadge estadoId={estado} fontSize={14} />
          </View>

            <View style={{ width:'100%'}}>
              <View style={globalStyles.borderBottom}/>
            </View>


           <Text style={styles.title}>Producto:</Text>
           <Text style={styles.textValue}>{producto?.nombre}</Text>
           <Text style={styles.title}>Cantidad:</Text>
           <Text style={styles.textValue}>{cantidadInicial}</Text>

          <Text style={styles.title}>Observación:</Text>
          <Text style={styles.textValue}>{ordenParam?.observacion || "Sin observación"}</Text>

          <View style={{ width:'100%'}}>
            <View style={globalStyles.borderBottom}/>
          </View>

          <Text style={styles.title}>Receta {receta?.nombre} </Text>
          <Text style={styles.textValue}>Temperatura: {receta?.temperatura} °C</Text>
          <Text style={styles.textValue}>Tiempo {receta?.tiempo} min</Text>

          <Text style={[styles.textValue, { fontFamily:'PoppinsMedium' }]}>Ingredientes:</Text>

          {ingredientes?.map((ingrediente : IIngrediente, index: number) => (
            <Text key={index} style={styles.textValue}>
              {ingrediente?.cantidad}{ingrediente?.tipoDeUnidad}. de {ingrediente?.nombre}
            </Text>
          ))}

          <Text style={[styles.textValue, { fontFamily:'PoppinsMedium' }]}>Observación:</Text>
          <Text style={styles.textValue}>{ordenParam?.observacion || "Sin observación"}</Text>

      <View style={{height: 20, width:'100%'}} />
          </View>

          <View style={{height: 20, width:'100%'}} />

        {
          ordenParam?.estado !== 4 && // Si no está cancelada
                  <Button
                    title="Cancelar orden"
                    onPress={confirmCancel}
                    style={{ width: '100%' }}
                  />
        }
        </ScrollView>
        <View style={{ marginVertical: 10 }} />
    </View>
  );
}


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
    fontSize: 20,
    fontFamily: "PoppinsMedium",
  }, 
  textValue: {
    fontSize: 16,
    fontFamily: "PoppinsLight",
    color: "#333",
    marginBottom: 2,
  },
});