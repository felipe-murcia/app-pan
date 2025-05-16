import { Button, Text, View } from "react-native";
import ButtonMenu from "./BotonMenu/ButtonMenu";
//import { useRouter } from 'expo-router';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../interfaces/RootStackParamList";
import { FlatList } from "react-native-gesture-handler";
import { menuItems } from "../../constant/menu";

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

      <View style={{ height: 20 }} />
      <Text style={{fontSize:28, fontFamily: 'PoppinsMedium'}}>Hola, usuario.</Text>
      <Text style={{fontSize:14, fontFamily: 'PoppinsLight' }}>Bienvenido a la app de panaderia.</Text>

      
      <FlatList
        data={menuItems}
        renderItem={({item}) => <ButtonMenu title={item.title} icon={item.icon} onPress={()=>navigation.navigate(item.screen)}/>}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{ marginVertical: 20 }}
      />
    </View>
  );
}
