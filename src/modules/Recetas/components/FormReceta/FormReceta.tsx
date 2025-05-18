
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, Alert } from "react-native";
import { IIngrediente, IReceta } from "../../models/Receta";
import Button from "../../../../components/Button/Button";
import ButtonDashed from "../../../../components/ButtonDashed/Button";
import InputText from "../../../../components/InputText/InputText";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";
import useValidateForm from "../../hooks/useValidateForm";
import { FieldError } from "../../../../interfaces/FieldError";
import { filterError } from "../../../../utils/filterError";
import FormIngrediente from "../FormIngrediente.tsx/FormIngrediente";
import ItemIngrediente from "../../../../components/ItemIngrediente/ItemIngrediente";

interface Props {
  onPress?: () => void;
  receta?: IReceta;
  loading?: boolean;
  handleChange: (data: InputType) => void;
}


export default function FormReceta({ onPress = () => {}, receta, loading = false, handleChange }: Props) {

  const [ error, setError ] = useState<FieldError[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSaveIngredient = (ingrediente: IIngrediente) => {
    if (ingrediente.nombre && ingrediente.cantidad) {      
      handleChange({ name: "ingredientes", value: [...receta?.ingredientes || [], ingrediente] });
      setModalVisible(false);
    }
  };

  const { validate } = useValidateForm();

  const handleSave = async () => {
    const validation = validate(receta as IReceta);
    if (!validation.isValid) {
      console.log('Validation errors found: -', validation.errors);
      setError(validation.errors);
      return;
    }
    onPress();
    console.log('Validation passed:', receta);
  }

  const handleItemRemove = (index: number) => {

      Alert.alert(
        "Eliminar ingrediente",
        "¿Estás seguro que deseas eliminar este ingrediente?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => {
              const newIngredientes = [...receta?.ingredientes || []];
              newIngredientes.splice(index, 1);
              handleChange({ name: "ingredientes", value: newIngredientes });
            },
          },
        ]
      );
  }

  return (
    <View>
          <InputText onChangeText={(value:string)=>handleChange({ name: "nombre", value })} value={receta?.nombre} label="Nombre de la receta" placeholder="Nombre de la receta" error={filterError("nombre", error)}/>
          <InputText onChangeText={(value:number)=>handleChange({ name: "temperatura", value })} value={receta?.temperatura} label="Temperatura (celsius)" placeholder="120"  keyboardType="numeric" error={filterError("temperatura", error)}/>
          <InputText onChangeText={(value:number)=>handleChange({ name: "tiempo", value })} value={receta?.tiempo} label="Tiempo (minuto)" placeholder="200"  keyboardType="numeric" error={filterError("tiempo", error)}/>
          <InputToggle onValueChange={(value:boolean)=>handleChange({ name: "conPicada", value })} value={receta?.conPicada} label="Picada" />
          {
            receta?.conPicada &&
            <InputText onChangeText={(value:number)=>handleChange({ name: "picada", value })} value={receta?.picada} label={""} placeholder="Picada (gramos)"  keyboardType="numeric" error={filterError("picada", error)}/>
          }
          <InputTextArea onChangeText={(value:string)=>handleChange({ name: "observacion", value })} value={receta?.observacion} label="Observaciones" placeholder="..." numberOfLines={4} />
          <InputText onChangeText={(value:string)=>handleChange({ name: "cantidad", value })} value={receta?.cantidad} label="Cantidad recomendada" placeholder="100 (unidades)" keyboardType="numeric" error={filterError("cantidad", error)} />

          <Text style={{ fontSize: 16, fontFamily: "PoppinsMedium"}}>Ingredientes</Text>
          <Text style={{ fontSize: 12, fontFamily: "PoppinsLight" }}>
              Agregar ingrediente a la receta, puedes agregar varios ingredientes
              para una receta.
          </Text>
          <View style={{ height: 10 }} />

          {receta?.ingredientes.map((item,i) => (
            <ItemIngrediente key={i} data={item} onPress={()=>handleItemRemove(i)} />
          ))}

          <View style={{ height: 10 }} />

          <ButtonDashed title="Agregar" onPress={()=>setModalVisible(!modalVisible)} color="#f44336" />

          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Guardando receta...</Text>
            :<Button title="Guardar" onPress={handleSave} color="#4caf50"  style={{ marginTop: 20 }}/>
          }


        <View style={{ marginVertical: 10 }} />

        <FormIngrediente
          show={modalVisible}
          onHandleSave={(value:IIngrediente) => handleSaveIngredient(value)}
          setModalVisible={setModalVisible}
        /> 

        
    </View>
  );
}
