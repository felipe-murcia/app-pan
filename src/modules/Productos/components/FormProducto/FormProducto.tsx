
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, Alert } from "react-native";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";
import InputToggle from "../../../../components/InputToggle/InputToggle";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";
import useValidateForm from "../../hooks/useValidateForm";
import { FieldError } from "../../../../interfaces/FieldError";
import { filterError } from "../../../../utils/filterError";
import { IProducto } from "../../models/Producto";

interface Props {
  onPress?: () => void;
  receta?: IProducto;
  loading?: boolean;
  handleChange: (data: InputType) => void;
}


export default function FormProducto({ onPress = () => {}, receta, loading = false, handleChange }: Props) {

  const [ error, setError ] = useState<FieldError[]>([]);
  const { validate } = useValidateForm();

  const handleSave = async () => {
    const validation = validate(receta as IProducto);
    if (!validation.isValid) {
      console.log('Validation errors found: -', validation.errors);
      setError(validation.errors);
      return;
    }
    onPress();
    console.log('Validation passed:', receta);
  }

  return (
    <View>
          <InputText onChangeText={(value:string)=>handleChange({ name: "nombre", value })} value={receta?.nombre} label="Nombre de la receta" placeholder="Ej: Pan 500" error={filterError("nombre", error)}/>
          <InputText onChangeText={(value:number)=>handleChange({ name: "precio", value })} value={receta?.precio} label="Precio ($)" placeholder="120"  keyboardType="numeric" error={filterError("precio", error)}/>
          <InputToggle onValueChange={(value:boolean)=>handleChange({ name: "disponible", value })} value={receta?.disponible} label="Picada" />
          <InputText onChangeText={(value:string)=>handleChange({ name: "cantidad", value })} value={receta?.stock} label="Cantidad inicial" placeholder="100 (unidades)" keyboardType="numeric" error={filterError("cantidad", error)} />
          <InputTextArea onChangeText={(value:string)=>handleChange({ name: "observacion", value })} value={receta?.observacion} label="Observaciones" placeholder="..." numberOfLines={4} />

         

          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Guardando producto...</Text>
            :<Button title="Guardar" onPress={handleSave} color="#4caf50"  style={{ marginTop: 20 }}/>
          }


        
    </View>
  );
}
