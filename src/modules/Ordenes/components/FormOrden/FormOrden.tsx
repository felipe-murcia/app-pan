
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, Alert } from "react-native";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";
//import useValidateForm from "../../hooks/useValidateForm";
import { FieldError } from "../../../../interfaces/FieldError";
import { filterError } from "../../../../utils/filterError";
import { IOrden } from "../../models/Orden";
import ButtonDashed from "../../../../components/ButtonDashed/Button";

interface Props {
  onPress?: () => void;
  orden?: IOrden;
  loading?: boolean;
  handleChange: (data: InputType) => void;
}


export default function FormOrden({ onPress = () => {}, orden, loading = false, handleChange }: Props) {

  const [ error, setError ] = useState<FieldError[]>([]);
  //const { validate } = useValidateForm();

  const handleSave = async () => {
    // const validation = validate(producto as IProducto);
    // if (!validation.isValid) {
    //   console.log('Validation errors found: -', validation.errors);
    //   setError(validation.errors);
    //   return;
    // }
    // onPress();
    console.log('Validation passed:', orden);
  }

  return (
    <View>
          <ButtonDashed title="Producto" onPress={()=>{}} color="#f44336" />
          <InputText onChangeText={(value:string)=>handleChange({ name: "cantidadInicial", value })} value={orden?.cantidadInicial} label="Cantidad" placeholder="100 (unidades)" keyboardType="numeric" error={filterError("cantidadInicial", error)} />
          <ButtonDashed title="Receta" onPress={()=>{}} color="#f44336" />
          <InputTextArea onChangeText={(value:string)=>handleChange({ name: "observacion", value })} value={orden?.observacion} label="Observaciones" placeholder="..." numberOfLines={4} />
          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Creando orden...</Text>
            :<Button title="Ordenar" onPress={handleSave} color="#4caf50"  style={{ marginTop: 20 }}/>
          }
        
    </View>
  );
}
