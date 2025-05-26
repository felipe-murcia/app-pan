import { Button, Text, View } from "react-native";
import ButtonMenu from "./BotonMenu/ButtonMenu";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../interfaces/RootStackParamList";
import { FlatList } from "react-native-gesture-handler";
import { menuItems } from "../../constant/menu";
import { colorPrimary } from "../../constant/color";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};


export default function Main({ navigation }: Props) {

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colorPrimary,
      }}
    >

      <View style={{ height: 20 }} />
      <Text style={{fontSize:28, fontFamily: 'PoppinsMedium'}}>Hola, usuario.</Text>
      <Text style={{fontSize:14, fontFamily: 'PoppinsLight' }}>Bienvenido a la app de panaderia.</Text>

      
      <FlatList
        data={menuItems}
        renderItem={({item}:any) => <ButtonMenu title={item.title} icon={item.icon} onPress={()=>navigation?.navigate(item.screen)}/>}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{ marginVertical: 20 }}
      />
    </View>
  );
}
