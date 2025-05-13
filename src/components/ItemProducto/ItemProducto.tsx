import { colorPrimaryBase } from "../../constant/color";
//import { IReceta } from "../../screens/Recetas/models/Receta";
import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { IReceta } from "../../modules/Recetas/models/Receta";

const { width, height } = Dimensions.get("window");

interface Props {
    data?: IReceta;
    onPress?: () => void;
}

export default function ItemProducto({ data, onPress }: Props) {
   

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fafafa",
        padding: 8,
        borderRadius: 8,
        marginVertical: 4,
        marginTop: 10,
        elevation:1,
        shadowOpacity:0.2,
        shadowRadius:10,
      }}
      onPress={onPress} >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ backgroundColor:colorPrimaryBase, borderRadius:50, padding:10 }}>
                <Image source={require("../../../assets/images/icon/pan.png")} style={{ width: 32, height: 32, tintColor:'' }} />
            </View>
          <View style={{ width: 5 }} />
          <View>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 16}}>{data?.nombre} Croaissant bocadillo</Text>
            <Text style={{ fontFamily: 'PoppinsLight', fontSize: 12}}>{data?.nombre} stock : 34 - precio: $2.000</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
