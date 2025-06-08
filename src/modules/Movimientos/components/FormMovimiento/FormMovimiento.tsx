
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../../../components/Button/Button";
import InputText from "../../../../components/InputText/InputText";
import InputTextArea from "../../../../components/InputTextArea/InputTextArea";
import { InputType } from "../../../../interfaces/InputType";
import { IMovimiento } from "../../models/Movimiento";
import ButtonDashed from "../../../../components/ButtonDashed/Button";
import { colorPrimaryDark } from "../../../../constant/color";
import { validateFormMov } from "../../hooks/validateFormMov";
import useMovimientoService from "../../hooks/useMovimientoService";
import ModalProducto from "../../../../components/ModalProducto/ModalProducto";
import RadioButton from "../../../../components/RadioButton/RadioButton";

interface Props {
  onSuccess?: () => void;
}

export default function FormMovimiento({ onSuccess = () => {} }: Props) {

  const { loading, error, createMovimiento } = useMovimientoService(false);

  const [ error2, setError ] = useState<string>("");
  const [ modalProducto, setModalProducto ] = useState<boolean>(false);
  const [ selectedProducto, setSelectedProducto ] = useState<any>({});

  const [ cantidadInicial, setCantidadInicial ] = useState<number>(0);
  const [ concepto, setConcepto ] = useState<string>("AJUSTES");
  //const { validate } = useValidateForm();

  const handleSave = async () => {
    let dataMov:IMovimiento = {
      concepto,
      productoId: selectedProducto.id,
      cantidad: parseInt(cantidadInicial),
      tipo: concepto === "AJUSTES" ? true: false, 
    };
    const validation = validateFormMov(dataMov);
    if (!validation.isValid) {
      console.log('Validation errors found: -', validation.errors);
      setError(validation.errors.map((error) => error.error).join(", "));
      return;
    }
    let res = await createMovimiento(dataMov);
    if (res?.id) onSuccess();
    console.log('Validation passed movimiento:', dataMov, res);
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
          
          <RadioButton
            name="Concepto"
            options={[
              { value: "AJUSTES", label: "Ajustes" },
              { value: "VENTAS", label: "Ventas" },
              { value: "PERDIDAS", label: "Perdidas" },
            ]}
            selectedKey={ concepto|| "AJUSTES"}
            onChange={(key) => setConcepto(key)}
          />

          <InputText onChangeText={(value:number)=>setCantidadInicial(value)} value={cantidadInicial} label="Cantidad" placeholder="100 (unidades)" keyboardType="numeric"  />
          

          {
            error2 || error ? <Text style={{ color: "red", fontFamily: "PoppinsLight", fontSize: 14, textAlign: 'center', padding: 10 }}>{error2 || error }</Text>
            : null
          }
          {
            loading ? <Text style={{ fontSize: 14, fontFamily: "PoppinsLight", textAlign: 'center', padding: 40}}>Creando registro...</Text>
            :<Button title="Registrar" onPress={handleSave} color="#4caf50"  style={{ marginTop: 20 }}/>
          }

          <ModalProducto visible={modalProducto} onClose={() => setModalProducto(!modalProducto)} onSelect={(producto) => setSelectedProducto(producto)} />
          
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