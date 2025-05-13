//import HeaderModule from "@/src/components/HeaderModule/HeaderModule";
import { Button, Text, View } from "react-native";
//import { useRouter } from 'expo-router';
import { useState } from "react";
import useRecetasService from "../hooks/useRecetasService";
import HeaderModule from "../../../components/HeaderModule/HeaderModule";
import ItemReceta from "../components/ItemReceta/ItemReceta";
//import ItemReceta from "../../../components/ItemProducto/ItemProducto";
//import ItemReceta from './components/ItemReceta/ItemReceta';
//import useRecetasService from "./hooks/useRecetasService";

export default function RecetasScreen() {
  

  const { recetas, loading, error, refetch } = useRecetasService();
  
  //const router = useRouter();

  const handlePress = () => {
    console.log('Button pressed!');
    console.log('/Recetas/form')
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <HeaderModule title="Recetas" iconEnd="plus" onPressEnd={()=>handlePress()}/>
      <View>

      {
        recetas.map((receta, i) => (
          <ItemReceta key={i} data={receta} onPress={() => handlePress()} />
        ))
      }
      {/* <ItemReceta onPress={handlePress} /> */}

      {loading && <Text>Cargando recetas...</Text>}
      {error && <Text>Error: {error}</Text>}
      {recetas.length === 0 && !loading && <Text>No hay recetas disponibles.</Text>}

      
        


      </View>
    </View>
  );
}
