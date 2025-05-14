
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal } from "react-native";
import { IReceta } from "../../models/Receta";
import Button from "../../../../components/Button/Button";
import ButtonDashed from "../../../../components/ButtonDashed/Button";
import InputText from "../../../../components/InputText/InputText";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";

interface Props {
  onPress?: () => void;
  receta?: IReceta;
  loading?: boolean;
  handleChange: (data: InputType) => void;
}


export default function FormReceta({ onPress = () => {}, receta, loading = false, handleChange }: Props) {


  // const [ receta, setReceta ] = useState<IReceta>({
  //   nombre:'Pan prueba',
  //   cantidad: 10,
  //   observacion: 'Prueba de receta por el momento',
  //   conPicada: true,
  //   picada: 200,
  //   ingredientes: [],
  //   temperatura:80,
  //   tiempo:120
  // })
  const [modalVisible, setModalVisible] = React.useState(false);
  //const [ingredientes, setIngredientes] = React.useState<{ nombre: string; cantidad: string }[]>([]);
  const [ingrediente, setIngrediente] = React.useState<{ nombre: string; cantidad: string }>({ nombre: "", cantidad: "" });

  const handleSaveIngredient = () => {
    if (ingrediente.nombre && ingrediente.cantidad) {
      //setIngredientes([...ingredientes, { ...ingrediente }]);
      setIngrediente({ nombre: "", cantidad: "" });
      setModalVisible(false);
    }
  };
  
  return (
    <View>


          <InputText onChangeText={(value:string)=>handleChange({ name: "nombre", value })} value={receta?.nombre} label="Nombre de la receta" placeholder="Nombre de la receta" />
          <InputText onChangeText={(value:number)=>handleChange({ name: "temperatura", value })} value={receta?.temperatura} label="Temperatura (celsius)" placeholder="120"  keyboardType="numeric" />
          <InputText onChangeText={(value:number)=>handleChange({ name: "tiempo", value })} value={receta?.tiempo} label="Tiempo (minuto)" placeholder="200"  keyboardType="numeric" />
          <InputToggle onValueChange={(value:boolean)=>handleChange({ name: "conPicada", value })} value={receta?.conPicada} label="Picada" />
          {
            receta?.conPicada &&
            <InputText onChangeText={(value:number)=>handleChange({ name: "picada", value })} value={receta?.picada} label={""} placeholder="Picada (gramos)"  keyboardType="numeric" />
          }
          <InputTextArea onChangeText={(value:string)=>handleChange({ name: "observacion", value })} value={receta?.observacion} label="Observaciones" placeholder="..." numberOfLines={4} />
          <InputText onChangeText={(value:string)=>handleChange({ name: "nombre", value })} value={receta?.cantidad} label="Cantidad recomendada" placeholder="100 (unidades)" keyboardType="numeric" />

          <Text style={{ fontSize: 16, fontFamily: "PoppinsMedium"}}>Ingredientes</Text>

          {receta?.ingredientes.map((item,i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderColor: "#c1c1c1", marginBottom:5   }}>  
              <Text style={{ fontSize: 14, fontFamily: "PoppinsLight"}}>{item.nombre}</Text>
              <Text style={{ fontSize: 16, fontFamily: "PoppinsLight"}}>{item.cantidad}g</Text>
            </View>
          ))}

          <View style={{ height: 10 }} />

          <ButtonDashed title="Agregar" onPress={()=>setModalVisible(!modalVisible)} color="#f44336" />

          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Guardando receta...</Text>
            :<Button title="Guardar" onPress={onPress} color="#4caf50"  style={{ marginTop: 20 }}/>
          }


        <View style={{ marginVertical: 10 }} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "90%", backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Agregar Ingrediente</Text>
              <InputText onChangeText={(value:string)=>setIngrediente({ ...ingrediente, nombre: value })} value={ingrediente.nombre} label="Nombre del ingrediente" placeholder="Nombre del ingrediente" />
              <InputText onChangeText={(value:string)=>setIngrediente({ ...ingrediente, cantidad: value })} value={ingrediente.cantidad} label="Cantidad" placeholder="Cantidad" keyboardType="numeric"/>
              <Button title="Agregar" onPress={()=>handleSaveIngredient()} style={{ marginTop: 20 }} />
            </View>
          </View>
          </Modal>

        
    </View>
  );
}
