import { Button, Text, View } from "react-native";
import ButtonMenu from "../components/BotonMenu/ButtonMenu";
//import { useRouter } from 'expo-router';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/RootStackParamList";

// type RootStackParamList = {
//   Ordenes: undefined;
//   RecetaList: undefined;
//   Inventario: undefined;
//   Movimientos: undefined;
//   Main: undefined;
// };

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};


export default function Main({ navigation }: Props) {

  //const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text style={{fontSize:28, fontFamily: 'PoppinsSemiBold'}}>Hola, usuario.</Text>
      <Text style={{fontSize:14, fontFamily: 'PoppinsLight' }}>Bienvenido a la app de panaderia.</Text>

      <ButtonMenu title="Ordenes" icon="ordenes" onPress={()=>console.log('prueba')}/>
      <ButtonMenu title="Recetas" icon="recetas" onPress={()=>navigation.navigate("RecetaList")}/>
      <ButtonMenu title="Inventario" icon="productos" onPress={()=>console.log('/Inventario')}/>
      <ButtonMenu title="Movimientos" icon="movimientos" onPress={()=>console.log('/Movimientos')}/>
    </View>
  );
}
