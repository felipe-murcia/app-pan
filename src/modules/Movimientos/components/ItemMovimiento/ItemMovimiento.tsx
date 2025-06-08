//import { colorPrimaryBase } from "@/constant/color";
//import { IReceta } from "@/src/screens/Recetas/models/Receta";
import React from "react";
import { Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { borderColorTable, colorPrimaryBase, colorPrimaryDark } from '../../../../constant/color';
import globalStyles from "../../../../styles/globalStyles";
import { formatFecha } from "../../../../utils/formatDate";
import { IMovimiento } from "../../models/Movimiento";

const { width, height } = Dimensions.get("window");

interface Props {
  data?: IMovimiento;
  onPress?: () => void;
}


export default function ItemMovimiento({ data, onPress }: Props) {

  const getColor = () => {
    if(data?.concepto === "PRODUCCION") return colorPrimaryDark;
    else if(data?.concepto === "VENTAS") return '#10b981';
    else if(data?.concepto === "PERDIDAS") return '#AE2029';
    else return '#d2d2d2'
  }

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
          <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 20, paddingLeft: 5 }}>
            #{data?.id}
          </Text>
          <View style={{backgroundColor: getColor(), padding: 4, borderRadius:8, paddingHorizontal:12}}>
            <Text style={{ fontFamily: 'PoppinsMedium', fontSize: 12, color: 'white' }}>
              {data?.concepto}
            </Text>
          </View>
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
            <Text style={[globalStyles.labelCard, { paddingLeft: 3, fontSize:18, color: data?.tipo ? '#10b981': '#AE2029' }]}> {data?.tipo?'+':'-'} {data?.cantidad} Cantidad</Text>
          </View>
          <View style={{height: 8}}/>
          <Text style={globalStyles.labelCard}> {formatFecha(data?.createdAt)} </Text>
        </View>
        
    
      </View>
    </TouchableOpacity>
  );
}
