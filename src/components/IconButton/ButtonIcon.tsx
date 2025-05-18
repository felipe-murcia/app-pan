import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    onPress: () => void;
    icon?: string;
}

export default function ButtonIcon({ icon = '', onPress }: Props) {
  
  let iconSource = icon === "right" ? require("../../assets/images/icon/right.png"):
  icon === "plus" ? require("../../assets/images/icon/plus.png"):
  icon === "close" ? require("../../assets/images/icon/close.png"):
  icon === "delete" ? require("../../assets/images/icon/delete.png"):
  require("../../assets/images/menu/movimiento.png");

  return (
    <TouchableOpacity 
      onPress={onPress} >
      <View style={{ backgroundColor: "#fafafa", borderRadius:50, padding:10,  flexDirection: "row", justifyContent: "center", alignItems: "center",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
       }}> 
        <Image
          source={iconSource}
          style={{ width: 20, height: 20, tintColor:'black' }} />
      </View>
    </TouchableOpacity>
  );
}
