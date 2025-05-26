import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Main from "../modules/Main/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecetaList from "../modules/Recetas/screens/RecetaList";
import HeaderModule from '../components/HeaderModule/HeaderModule';
import RecetaCreate from "../modules/Recetas/screens/RecetaCreate";
import RecetaEdit from "../modules/Recetas/screens/RecetaEdit";
import ProductoScreen from "../modules/Productos/screens/ProductoScreen";
import ProductoCreate from "../modules/Productos/screens/ProductoCreate";
import ProductoEdit from "../modules/Productos/screens/ProductoEdit";
import OrdenesAdmin from "../modules/Ordenes/screens/OrdenesAdmint";
import OrdenCreate from "../modules/Ordenes/screens/OrdenCreate";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="RecetaList" component={RecetaList} options={{ headerShown: false }} />
        <Stack.Screen name="RecetaCreate" component={RecetaCreate} options={{ headerShown: false }} />
        <Stack.Screen name="RecetaEdit" component={RecetaEdit} options={{ headerShown: false }} />
        <Stack.Screen name="ProductoScreen" component={ProductoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductoCreate" component={ProductoCreate} options={{ headerShown: false }} />
        <Stack.Screen name="ProductoEdit" component={ProductoEdit} options={{ headerShown: false }} />
        <Stack.Screen name="OrdenesAdmin" component={OrdenesAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="OrdenCreate" component={OrdenCreate} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
