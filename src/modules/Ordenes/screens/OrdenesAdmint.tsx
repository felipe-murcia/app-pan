//import HeaderModule from "@/src/components/HeaderModule/HeaderModule";
import { Button, FlatList, Text, View } from "react-native";
//import { useRouter } from 'expo-router';
import { useState } from "react";
import useRecetasService from "../hooks/useOrdenService";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import ItemReceta from "../components/ItemOrden/ItemOrden";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import ItemOrden from "../components/ItemOrden/ItemOrden";
import useOrdenService from "../hooks/useOrdenService";
//import ItemReceta from "../../../components/ItemProducto/ItemProducto";
//import ItemReceta from './components/ItemReceta/ItemReceta';
//import useRecetasService from "./hooks/useRecetasService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrdenesAdmin">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};

export default function OrdenesAdmin({ navigation }: Props) {

  const { ordenes, loading, error, refetch } = useOrdenService(true);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title="Ordenes" iconEnd="plus" onPressEnd={()=>navigation.navigate("OrdenCreate", { onRefresh: refetch })}/>
      <View>

        <FlatList

          data={ordenes}
          renderItem={({ item }) => (
            <ItemOrden key={item.id} data={item} onPress={() => navigation.navigate("RecetaEdit", { receta: item as any, onRefresh: refetch })} />
          )}
          keyExtractor={item => item.id?.toString() || "0"}
          ListEmptyComponent={ !loading ? <Text>No hay orden disponible.</Text>: null}
          ListHeaderComponent={loading ? <Text>Cargando ordenes...</Text> : null}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </View>
    </View>
  );
}
