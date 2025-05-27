
import { FieldError } from "../../../interfaces/FieldError";
import { IOrden } from "../models/Orden";
export type ValidationResult = {
  isValid: boolean;
  errors: FieldError[];
};

export const validateFormOrden = (orden: IOrden): ValidationResult => {
    const errors: FieldError[] = [];

    if (!orden.productoId || orden.productoId  === 0) {
      errors.push({ key: "producto", error: "Seleccione el producto" });
    }
    if (!orden.cantidadInicial || orden.cantidadInicial <= 0) {
        errors.push({ key: "cantidad", error: "La cantidad es obligatoria" });
    }
    if (!orden.recetaId || orden.recetaId === 0) {
      errors.push({ key: "receta", error: "Seleccione la receta" });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };