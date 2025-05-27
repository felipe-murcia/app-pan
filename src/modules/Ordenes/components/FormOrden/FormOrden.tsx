
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";
import { IOrden } from "../../models/Orden";
import ButtonDashed from "../../../../components/ButtonDashed/Button";
import ModalProducto from "../ModalProducto/ModalProducto";
import { colorPrimaryDark } from "../../../../constant/color";
import ModalReceta from "../ModalReceta/ModalReceta";
import { validateFormOrden } from "../../hooks/validateFormOrden";
import useOrdenService from "../../hooks/useOrdenService";

interface Props {
  onSuccess?: () => void;
}

export default function FormOrden({ onSuccess = () => {} }: Props) {

  const { loading, error, saveOrden } = useOrdenService(false);

  const [ error2, setError ] = useState<string>("");
  const [ modalProducto, setModalProducto ] = useState<boolean>(false);
  const [ selectedProducto, setSelectedProducto ] = useState<any>({});
  const [ modalReceta, setModalReceta ] = useState<boolean>(false);
  const [ selectedReceta, setSelectedReceta ] = useState<any>({});

  const [ cantidadInicial, setCantidadInicial ] = useState<number>(0);
  const [ observacion, setObservacion ] = useState<string>("");
  //const { validate } = useValidateForm();

  const handleSave = async () => {
    let ordenData = {
      productoId: selectedProducto.id,
      cantidadInicial: cantidadInicial,
      recetaId: selectedReceta.id,
      observacion: observacion,
      estado: 1, 
    };
    const validation = validateFormOrden(ordenData as IOrden);
    if (!validation.isValid) {
      console.log('Validation errors found: -', validation.errors);
      setError(validation.errors.map((error) => error.error).join(", "));
      return;
    }

    let res = await saveOrden(ordenData as IOrden);
    if (res?.id) onSuccess();
    console.log('Validation passed ordenado:', ordenData, res);
  }

  return (
    <View>
          <Text style={styles.label}>Producto </Text>
          {
            selectedProducto?.id ?
            <TouchableOpacity onPress={() => setModalProducto(!modalProducto)} style={{ marginBottom: 10 }}>
              <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 20, marginTop: 10, borderWidth: 1, borderStyle: "dashed", borderColor: "#f44336" }}>
                <Text style={{ fontFamily: "PoppinsLight", fontSize: 18, color: colorPrimaryDark, textAlign:'center' }}>{selectedProducto.nombre}</Text>
              </View>
            </TouchableOpacity>
            :
            <ButtonDashed title="Producto" onPress={()=>setModalProducto(!modalProducto)} color="#f44336" />
          }
          <Text style={styles.label}>Receta </Text>
          {
            selectedReceta?.id ?
            <TouchableOpacity onPress={() => setModalReceta(!modalReceta)} style={{ marginBottom: 10 }}>
              <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 20, marginTop: 10, borderWidth: 1, borderStyle: "dashed", borderColor: "#f44336", alignItems: "center" }}>
                <Text style={{ fontFamily: "PoppinsMedium", fontSize: 22, color: colorPrimaryDark, textAlign:'center' }}>{selectedReceta.nombre}</Text>
                <Text style={{ fontFamily: "PoppinsLight", fontSize: 16, color: "#2e2e2e", textAlign:'center'  }}>
                  Tiempo: {selectedReceta.tiempo} min - Temp.: {selectedReceta.temperatura} °C {"\n"} {selectedReceta.ingredientes?.length} Ingredientes 
                </Text>
              </View>
            </TouchableOpacity>
            :
            <ButtonDashed title="Receta" color="#f44336"  onPress={() => setModalReceta(!modalReceta)}/>
          }
          
          <InputText onChangeText={(value:number)=>setCantidadInicial(value)} value={cantidadInicial} label="Cantidad" placeholder="100 (unidades)" keyboardType="numeric"  />
          <InputTextArea onChangeText={(value:string)=>setObservacion(value)} value={observacion} label="Observaciones" placeholder="..." numberOfLines={4} />

          {
            error2 || error ? <Text style={{ color: "red", fontFamily: "PoppinsLight", fontSize: 14, textAlign: 'center', padding: 10 }}>{error2 || error }</Text>
            : null
          }
          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Creando orden...</Text>
            :<Button title="Ordenar" onPress={handleSave} color="#4caf50"  style={{ marginTop: 20 }}/>
          }

          <ModalProducto visible={modalProducto} onClose={() => setModalProducto(!modalProducto)} onSelect={(producto) => setSelectedProducto(producto)} />
          
          <ModalReceta visible={modalReceta} onClose={() => setModalReceta(!modalReceta)} onSelect={(receta) => setSelectedReceta(receta)} />

    </View>
  );
}


const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333",
    fontFamily: "PoppinsLight",
  },
});