
import { Button, Text, View } from "react-native";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import ItemProducto from "../components/ItemProducto/ItemProducto";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import useProductosService from "../hooks/useProductoService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductoScreen">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};

export default function ProductoScreen({ navigation }: Props) {

  const { productos, loading, error, refetch } = useProductosService(true);
  
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title="Productos" iconEnd="plus" onPressEnd={()=>navigation.navigate("ProductoCreate", { onRefresh: refetch })}/>
      <View>

      {
        productos.map((producto, i) => (
          <ItemProducto key={i} data={producto} onPress={() => navigation.navigate("ProductoEdit", { producto, onRefresh: refetch })}/>
        ))
        // <ItemProducto key={i} data={producto} onPress={() => navigation.navigate("RecetaEdit", { producto, onRefresh: refetch })} />
      }

      {loading && <Text>Cargando productos...</Text>}
      {error && <Text>Error: {error}</Text>}
      {productos.length === 0 && !loading && <Text>No hay productos disponibles.</Text>}

      
        


      </View>
    </View>
  );
}
