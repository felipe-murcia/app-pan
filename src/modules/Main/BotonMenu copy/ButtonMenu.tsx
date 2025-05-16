import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    title: string;
    onPress: () => void;
    icon: string;
}

export default function ButtonMenu({ title, icon, onPress }: Props) {

  let iconSource = icon === "ordenes" ? require("../../../assets/images/menu/ordenes.png"):
  icon === "productos" ? require("../../../assets/images/menu/productos.png") :
  icon === "recetas" ? require("../../../assets/images/menu/recetas.png") :
  require("../../../assets/images/menu/movimiento.png");

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fafafa",
        padding: 14,
        borderRadius: 8,
        margin: 4,
        marginBottom: 10,
        elevation:1,
        shadowOpacity:0.2,
        shadowRadius:10,
      }}
      onPress={onPress} >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={iconSource} style={{ width: 48, height: 48, tintColor:'' }} />
          <View style={{ width: 10 }} />
          <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 18}}>{title}</Text>
        </View>
        <Image
          source={require("../../../assets/images/menu/derecha.png")}
          style={{ width: 32, height: 32, tintColor:'' }} />
      </View>
    </TouchableOpacity>
  );
}
