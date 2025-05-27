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
 


        <View style={[globalStyles.flexCenter]} >
          <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 22, paddingLeft: 5 }}>
            #{data?.id}
          </Text>
          <EstadoBadge estadoId={data?.estado} />
        </View>   
 
        <View style={globalStyles.borderBottom}/>
        
        <View style={{ alignItems:'center'}}>

          <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 22, paddingLeft: 5 }}>
            {data?.producto?.nombre}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require("../../../../assets/images/icon/pan.png")}
              style={{ width: 18, height: 18, tintColor:'' }} />
            <Text style={[globalStyles.labelCard, { paddingLeft: 3, fontSize:18 }]}> {data?.cantidadInicial} Cantidades</Text>
          </View>
          <View style={{height: 8}}/>
          <Text style={globalStyles.labelCard}> {formatFecha(data?.createdAt)} </Text>
        </View>
        
    
      </View>
    </TouchableOpacity>
  );
}
