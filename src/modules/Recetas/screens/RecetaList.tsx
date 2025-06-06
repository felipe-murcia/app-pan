//import HeaderModule from "@/src/components/HeaderModule/HeaderModule";
import { Button, FlatList, Text, View } from "react-native";
//import { useRouter } from 'expo-router';
import { useState } from "react";
import useRecetasService from "../hooks/useRecetasService";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import ItemReceta from "../components/ItemReceta/ItemReceta";
import { RootStackParamList } from "../../../interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
//import ItemReceta from "../../../components/ItemProducto/ItemProducto";
//import ItemReceta from './components/ItemReceta/ItemReceta';
//import useRecetasService from "./hooks/useRecetasService";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "RecetaList">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};

export default function RecetasScreen({ navigation }: Props) {

  const { recetas, loading, error, refetch } = useRecetasService(true);

  const handlePress = () => {
    console.log('Button pressed!');
    console.log('/Recetas/form')
  }

  const testLoad = async () => {
    console.log('testLoad');
    alert('testLoad');
  }
  
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title="Recetas" iconEnd="plus" onPressEnd={()=>navigation.navigate("RecetaCreate", { onRefresh: refetch })}/>
      <View>

        <FlatList
          data={recetas}
          renderItem={({ item }) => (
            <ItemReceta key={item.id} data={item} onPress={() => navigation.navigate("RecetaEdit", { receta: item, onRefresh: refetch })} />
          )}
          keyExtractor={item => item.id?.toString() || "0"}
          ListEmptyComponent={<Text>No hay recetas disponibles.</Text>}
          ListHeaderComponent={loading ? <Text>Cargando recetas...</Text> : null}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

   
      
        


      </View>
    </View>
  );
}
