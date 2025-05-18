import { FieldError } from "../../../interfaces/FieldError";
import { IProducto } from "../models/Producto";
export type ValidationResult = {
  isValid: boolean;
  errors: FieldError[];
};

export default function useValidateFormProducto() {

  const validate = (receta: IProducto): ValidationResult => {
    const errors: FieldError[] = [];

    if (!receta.nombre || receta.nombre.trim() === "") {
      errors.push({ key: "nombre", error: "El nombre es obligatorio" });
    }
    if (!receta.stock || receta.stock <= 0) {
        console.log('Receta cantidad:', receta.stock);
      errors.push({ key: "cantidad", error: "La cantidad es obligatoria" });
    }
    if (!receta.precio || receta.precio <= 0) {
        console.log('Receta cantidad:', receta.precio);
      errors.push({ key: "precio", error: "El precio es obligatoria" });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return { validate };
}