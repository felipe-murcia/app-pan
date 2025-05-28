import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import ButtonMenu from "./BotonMenu/ButtonMenu";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../interfaces/RootStackParamList";
import { FlatList } from "react-native-gesture-handler";
import { menuItems } from "../../constant/menu";
import { colorPrimary } from "../../constant/color";
import { useState } from "react";
import useUserStore from "../../stores/useUserStore";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
//type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
  //route: MainScreenRouteProp;
};


export default function Main({ navigation }: Props) {

  //const [ isAdmin, setIsAdmin ] = useState<boolean>(true);

  const { user, setUser, clearUser } = useUserStore();

  let isAdmin = user.role === "admin";

  let setIsAdmin = (value: boolean) => {
    if (value) {
      setUser({ ...user, role: "admin" });
    } else {
      setUser({ ...user, role: "user" });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colorPrimary
      }}
    >

      <View style={{ height: 20 }} />

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{fontSize:28, fontFamily: 'PoppinsMedium'}}>Hola, {user.role ? "Admin" : "Usuario"}.</Text>
          <Text style={{fontSize:14, fontFamily: 'PoppinsLight' }}>Bienvenido a la app de panaderia.</Text>
        </View>
        <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
          <Image
            source={require("../../assets/panadero.png")}
            style={{ width: 50, height: 50, resizeMode: "contain", borderWidth: 2, borderColor: "#fff", borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
            data={menuItems.filter(item => item.role === (isAdmin ? "admin" : "user"))}
            renderItem={({item}:any) => <ButtonMenu title={item.title} icon={item.icon} onPress={()=>navigation?.navigate(item.screen)}/>}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: isAdmin?"space-between":'center' }}
            style={{ marginVertical: 20 }}
          />
    </View>
  );
}
