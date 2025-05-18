//import { colorPrimaryBase } from "@/constant/color";
//import { IReceta } from "@/src/screens/Recetas/models/Receta";
import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { IReceta } from "../../models/Receta";
import { colorPrimaryBase } from "../../../../constant/color";

const { width, height } = Dimensions.get("window");

interface Props {
  data?: IReceta;
  onPress?: () => void;
}

export default function ItemReceta({ data, onPress }: Props) {
   

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fafafa",
        padding: 8,
        borderRadius: 8,
        margin: 2,
        marginTop: 5,
        elevation:1,
        shadowOpacity:0.2,
        shadowRadius:10,
      }}
      onPress={onPress} >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ backgroundColor:colorPrimaryBase, borderRadius:50, padding:10 }}>
                <Image source={require("../../../../assets/images/icon/recipe.png")} style={{ width: 28, height: 28, tintColor:'' }} />
            </View>
          <View style={{ width: 5 }} />
          <View>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 16}}>{data?.nombre} </Text>
            <Text style={{ fontFamily: 'PoppinsLight', fontSize: 12}}>Tiempo: {data?.tiempo}m | Temperatura: {data?.temperatura}°</Text>
          </View>
        </View>
        <Image
          source={require("../../../../assets/images/icon/more.png")}
          style={{ width: 32, height: 32, tintColor:'' }} />
      </View>
    </TouchableOpacity>
  );
}
