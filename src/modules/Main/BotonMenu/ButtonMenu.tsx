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
        marginBottom: 10,
        elevation:1,
        shadowOpacity:0.2,
        shadowRadius:10,
        width: (width/2) - 30,
        paddingVertical: 30,
      }}
      onPress={onPress} >
      <View style={{ alignItems: "center" }}>
        <View style={{ padding:16, borderRadius:50, backgroundColor:'#f0f0f0' }} >
          <Image source={iconSource} style={{ width: 48, height: 48, tintColor:'' }} />
        </View>
        <View style={{ height: 10 }} />
        <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 18}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
