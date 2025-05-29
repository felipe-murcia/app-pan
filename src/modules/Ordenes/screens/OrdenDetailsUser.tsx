import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
// import { IReceta } from "../models/Receta";
import { RecetaService } from "../../../services/recetaServices";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
// import FormReceta from "../components/FormReceta/FormReceta";
import { InputType } from "../../../interfaces/InputType";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { IProducto } from "../../Productos/models/Producto";
import { IOrden } from "../models/Orden";
import useRecetasService from "../../Recetas/hooks/useRecetasService";
import FormOrden from "../components/FormOrden/FormOrden";
import { EstadoBadge } from "../components/EstadoBadge/EstadoBadge";
import globalStyles from "../../../styles/globalStyles";
import { IIngrediente } from "../../Recetas/models/Receta";
import Button from "../../../components/Button/Button";
import useOrdenService from "../hooks/useOrdenService";
import { borderColorTable } from "../../../constant/color";
import StatusOrder from "../components/StatusOrder/StatusOrder";
import ItemOrden from "../components/ItemOrden/ItemOrden";
import ItemTable from "../components/Itemtable/ItemTable";
import ModalCantidadFinal from "../components/ModalCantidadFinal/ModalCantidadFinal";

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrdenDetailsUser"
>;
type MainScreenRouteProp = RouteProp<RootStackParamList, "OrdenDetailsUser">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function OrdenDetailsUser({ navigation, route }: Props) {

  let data = route?.params?.orden as IOrden;
  const [ ordenParam, setOrdenParam ] = useState<IOrden>(data || {});
  const { updateOrden, loading } = useOrdenService();

  const [ modalCantidad, setModalCantidad ] = useState<boolean>(false);

  const handleConfirmOrder = async (estado: number, cantidad: number) => {
    const data: IOrden = {
      ...ordenParam,
      estado: estado,
      cantidadFinal: cantidad,
    };
    console.log("tomando orden:", data);
    let res = await updateOrden(data);
    console.log("Resultado de tomar orden:", res);
    if (res) {
      setOrdenParam({ ...ordenParam, estado: estado, cantidadFinal: cantidad });
      route?.params?.onRefresh?.(); 
    }
  };

  const confirmCancel = () => {
    Alert.alert(
      "Confirmar orden",
      "¿Estás seguro de que deseas tomar esta orden?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Aceptar", onPress: () => handleConfirmOrder(2, ordenParam?.cantidadInicial ) },
      ],
      { cancelable: false }
    );
  };

    const confirmCompleted = () => {
    Alert.alert(
      "Finalizar orden",
      "¿Marcar orden como terminada?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Aceptar", onPress: () => setModalCantidad(true) },
      ],
      { cancelable: false }
    );
  };

  let { producto, receta, cantidadInicial, estado } =
    ordenParam || {};

  const ingredientes = receta?.ingredientes
    ? JSON.parse(receta.ingredientes.toString())
    : [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HeaderModule
        title="Detalles"
        iconEnd="close"
        onPressEnd={() => navigation?.goBack()}
      />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      >

        <ModalCantidadFinal
          visible={modalCantidad}
          onClose={() => setModalCantidad(false)}
          onSave={(cantidad: number) => {
            setModalCantidad(false);
            handleConfirmOrder(3, cantidad);
          }}
        />

        <StatusOrder status={estado} />
        <View
          style={{
            alignItems: "flex-start",
            paddingTop: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={[
              globalStyles.flexCenter,
              { justifyContent: "space-between", width: "100%" },
            ]}
          >
            <Text style={styles.title}>Orden #{ordenParam?.id}</Text>
            <EstadoBadge estadoId={estado} fontSize={14} />
          </View>

          <View style={{ width: "100%" }}>
            <View style={globalStyles.borderBottom} />
          </View>


          <ItemTable label="Producto" labelBold={true}  value={producto?.nombre || "Sin producto"} /> 
          <ItemTable label="Cantidad" labelBold={true} value={cantidadInicial+""} />
          <ItemTable label="Observación" labelBold={true} value={ordenParam?.observacion || "Sin observación"} />    

          <View style={{ width: "100%" }}>
            <View style={globalStyles.borderBottom} />
          </View> 

         
         <View style={{ marginVertical: 16 }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium", fontSize: 20 }]}
                >
                  {receta?.nombre}
                </Text>
              </View> 
            </View>

            <ItemTable label="Temperatura" labelBold={true}  value={`${receta?.temperatura} °C`} />
            <ItemTable label="Tiempo" labelBold={true}  value={`${receta?.tiempo} min`} />


        <View style={globalStyles.borderBottom} />

        {
          receta?.conPicada &&(
            <>
            <ItemTable label="Picada" value={`${receta?.picada} gr` || "Sin picada"}  labelBold={true} />
            </>
          )
        }

        
        <ItemTable label="Ingrediente" value={`Cantidad`} valueBold={true} labelBold={true} />
   
          
            {ingredientes?.map((ingrediente: IIngrediente, index: number) => (
              <ItemTable key={index} label={ingrediente.nombre} value={`${ingrediente.cantidad} ${ingrediente.tipoDeUnidad}`} />
            ))}
          </View>

          <ItemTable label="Nota" value={receta?.observacion || " "} labelBold={true} />

          {
            estado == 3 &&
            <ItemTable label="Cantidad producida" value={ordenParam?.cantidadFinal+" "} labelBold={true} />
          }

          <View style={{ height: 20, width: "100%" }} />
        </View>

        <View style={{ height: 20, width: "100%" }} />


        { loading && <ActivityIndicator size="large" /> }


        {ordenParam?.estado == 1 && !loading && ( 
          <Button
            title="Tomar orden"
            onPress={confirmCancel}
            style={{ width: "100%" }}
          />
        )}

        {ordenParam?.estado == 2 && !loading &&(  
          <Button
            title="Completar orden"
            onPress={confirmCompleted}
            style={{ width: "100%" }}
          />
        )}
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
