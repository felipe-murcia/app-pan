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
import useUserStore from "../../../stores/useUserStore";
//import ItemReceta from "../../../components/ItemProducto/ItemProducto";
//import ItemReceta from './components/ItemReceta/ItemReceta';
//import useRecetasService from "./hooks/useRecetasService";
import { RouteProp } from "@react-navigation/native";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "OrdenesAdmin">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "OrdenesAdmin">;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

export default function OrdenesAdmin({ navigation, route }: Props) {

  const { ordenes, loading, error, refetch } = useOrdenService(true);

  const { user  } = useUserStore();

  let isAdmin = user.role === "admin";

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title={isAdmin ? "Ordenes" : "Mis Ordenes"} iconEnd={isAdmin ? "plus" : "close"} onPressEnd={()=> isAdmin ? navigation.navigate("OrdenCreate", { onRefresh: refetch }): navigation.goBack()}/>
      <View>

        <FlatList

          data={ordenes}
          renderItem={({ item }) => (
            <ItemOrden key={item.id} data={item} onPress={() => 
              isAdmin ? navigation.navigate("OrdenDetailsAdmin", { orden: item as any, onRefresh: refetch })
              : navigation.navigate("OrdenDetailsUser", { orden: item as any, onRefresh: refetch })
            } />
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
