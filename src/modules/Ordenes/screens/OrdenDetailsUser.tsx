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
  console.log("RecetaEdit route:", route?.params?.orden);
  let ordenParam = route?.params?.orden as IOrden;
  

  const { updateOrden, loading } = useOrdenService();

  const handleConfirmTakeOrder = async () => {
    const data: IOrden = {
      ...ordenParam,
      estado: 2, // Estado 4 es "Cancelada"
    };
    console.log("tomando orden:", data);
    let res = await updateOrden(data);
    console.log("Resultado de tomar orden:", res);
    if (res) {
      ordenParam = { ...ordenParam, estado: 2 }; // Actualizar el estado localmente
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
        { text: "Aceptar", onPress: handleConfirmTakeOrder },
      ],
      { cancelable: false }
    );
  };

  let { producto, receta, cantidadInicial, cantidadFinal, estado } =
    ordenParam || {};

  const ingredientes = receta?.ingredientes
    ? JSON.parse(receta.ingredientes.toString())
    : [];

  console.log("OrdenDetailsAdmin ingredientes:", ingredientes);

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

    

          <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Producto
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue ]}
                >
                  {producto?.nombre || "Sin producto"}
                </Text>
              </View>

        </View>


        <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Cantidad
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue ]}
                >
                  { cantidadInicial }
                </Text>
              </View>

        </View>


        <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Observación
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue ]}
                >
                  {ordenParam?.observacion || "Sin observación"}
                </Text>
              </View>

        </View>


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
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Temperatura
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue ]}
                >
                  {receta?.temperatura} °C
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Tiempo
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue ]}
                >
                  {receta?.tiempo} min
                </Text>
              </View>

        </View>

        <View style={globalStyles.borderBottom} />


        <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Ingrediente
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Cantidad
                </Text>
              </View>

        </View>

   
          
            {ingredientes?.map((ingrediente: IIngrediente, index: number) => (
              <View key={index} style={{ width: "100%", flexDirection: "row" }}>
                <View style={globalStyles.cell}>
                  <Text style={styles.textValue}>{ingrediente.nombre}</Text>
                </View>
                <View style={globalStyles.cell}>
                  <Text style={styles.textValue}>
                    {ingrediente.cantidad} {ingrediente.tipoDeUnidad}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue, { fontFamily: "PoppinsMedium" }]}
                >
                  Nota
                </Text>
              </View>
              <View style={globalStyles.cell}>
                <Text
                  style={[styles.textValue]}
                >
                  {receta?.observacion }
                </Text>
              </View>

        </View>

         

          <View style={{ height: 20, width: "100%" }} />
        </View>

        <View style={{ height: 20, width: "100%" }} />

        {ordenParam?.estado !== 4 && ( // Si no está cancelada
          <Button
            title="Tomar orden"
            onPress={confirmCancel}
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
