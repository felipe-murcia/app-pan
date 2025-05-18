import { colorPrimaryBase } from "../../constant/color";
import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { IIngrediente } from "../../modules/Recetas/models/Receta";

interface Props {
    data?: IIngrediente;
    onPress?: () => void;
}

export default function ItemIngrediente({ data, onPress }: Props) {
   

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
                <Image source={require("../../assets/images/icon/harina.png")} style={{ width: 28, height: 28  }} />
            </View>
          <View style={{ width: 5 }} />
          <View>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 16}}>{data?.nombre}</Text>
            <Text style={{ fontFamily: 'PoppinsLight', fontSize: 16}}>Cantidad: {data?.cantidad} {data?.tipoDeUnidad}.</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
