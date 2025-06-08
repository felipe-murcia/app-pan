//import HeaderModule from "@/src/components/HeaderModule/HeaderModule";
import { Button, FlatList, Text, View } from "react-native";
//import { useRouter } from 'expo-router';
import { useState } from "react";
import useRecetasService from "../hooks/useMovimientoService";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import ItemOrden from "../components/ItemMovimiento/ItemMovimiento";
import useOrdenService from "../hooks/useMovimientoService";
import useUserStore from "../../../stores/useUserStore";
import { RouteProp } from "@react-navigation/native";
import ItemMovimiento from "../components/ItemMovimiento/ItemMovimiento";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "MovimientoScreen">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "MovimientoScreen">;

type Props = {
  navigation?: MainScreenNavigationProp;
  route?: MainScreenRouteProp;
};

export default function MovimientoScreen({ navigation, route }: Props) {

  const { movimientos, loading, error, refetch } = useRecetasService(true);

  const { user  } = useUserStore();

  let isAdmin = user.role === "admin";

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title={"Movimientos"} iconEnd={"config"} onPressEnd={()=> navigation?.navigate("MovimientoCreate", { onRefresh: refetch })}/>
      <View>

        <FlatList

          data={movimientos}
          renderItem={({ item }) => (
            <ItemMovimiento key={item.id} data={item} onPress={() => {}} />
          )}
          keyExtractor={item => item.id?.toString() || "0"}
          ListEmptyComponent={ !loading ? <Text>No hay movimiento disponible.</Text>: null}
          ListHeaderComponent={loading ? <Text>Cargando movimientos...</Text> : null}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </View>
    </View>
  );
}
