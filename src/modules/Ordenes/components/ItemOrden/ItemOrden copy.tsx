//import { colorPrimaryBase } from "@/constant/color";
//import { IReceta } from "@/src/screens/Recetas/models/Receta";
import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { IOrden } from "../../models/Orden";
import { colorPrimaryBase, colorPrimaryDark } from "../../../../constant/color";
import { EstadoBadge } from "../EstadoBadge/EstadoBadge";
import globalStyles from "../../../../styles/globalStyles";
import { formatFecha } from "../../../../utils/formatDate";

const { width, height } = Dimensions.get("window");

interface Props {
  data?: IOrden;
  onPress?: () => void;
}


export default function ItemOrden({ data, onPress }: Props) {

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
      <View >
 
      
        <View style={{height: 8}}/>
        <View style={globalStyles.flexCenter}>
           <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 18, paddingLeft: 5 }}>
            {data?.producto?.nombre}
          </Text>
          <Image
            source={require("../../../../assets/images/icon/pan.png")}
            style={{ width: 24, height: 24, tintColor:'' }} />
        </View>
        <View style={{height: 8}}/>
        <View style={{ alignContent: "center", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderColor: colorPrimaryDark  }}>
          <Text style={{ fontFamily: 'PoppinsLight', fontSize: 16,  textAlign: "center"}}>Cantidad: {data?.cantidadInicial}</Text>
        </View>

        <View style={globalStyles.borderBottom}/>

        <View style={[globalStyles.flexCenter]} >     
          <Text style={{ fontFamily: 'PoppinsLight', fontSize: 12}}>{formatFecha(data?.createdAt)}</Text>
          <EstadoBadge estadoId={data?.estado} />
        </View>   
      </View>
    </TouchableOpacity>
  );
}
