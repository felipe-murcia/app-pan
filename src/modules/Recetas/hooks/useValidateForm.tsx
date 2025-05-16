import { IReceta } from "../models/Receta";
import { FieldError } from "../../../interfaces/FieldError";
export type ValidationResult = {
  isValid: boolean;
  errors: FieldError[];
};

export default function useValidateFormReceta() {

  const validate = (receta: IReceta): ValidationResult => {
    const errors: FieldError[] = [];

    if (!receta.nombre || receta.nombre.trim() === "") {
      errors.push({ key: "nombre", error: "El nombre es obligatorio" });
    }
    if (!receta.cantidad || receta.cantidad <= 0) {
        console.log('Receta cantidad:', receta.cantidad);
      errors.push({ key: "cantidad", error: "La cantidad es obligatoria" });
    }
    // if (!receta.observacion || receta.observacion.trim() === "") {
    //   errors.push({ key: "observacion", error: "La observación es obligatoria" });
    // }
    if (receta.conPicada && (!receta.picada || receta.picada <= 0)) {
      errors.push({ key: "picada", error: "La picada es obligatoria" });
    }
    if (!receta.ingredientes || receta.ingredientes.length === 0) {
      errors.push({ key: "ingredientes", error: "Debe agregar al menos un ingrediente" });
    }
    if (!receta.temperatura) {
      errors.push({ key: "temperatura", error: "La temperatura es obligatoria" });
    }
    if (!receta.tiempo) {
      errors.push({ key: "tiempo", error: "El tiempo es obligatorio" });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return { validate };
}