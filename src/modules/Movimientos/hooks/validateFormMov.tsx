
import { FieldError } from "../../../interfaces/FieldError";
import { IMovimiento } from "../models/Movimiento";
export type ValidationResult = {
  isValid: boolean;
  errors: FieldError[];
};

export const validateFormMov = (orden: IMovimiento): ValidationResult => {
    const errors: FieldError[] = [];

    if (!orden.productoId || orden.productoId  === 0) {
      errors.push({ key: "producto", error: "Seleccione el producto" });
    }
    if (!orden.cantidad || orden.cantidad <= 0) {
        errors.push({ key: "cantidad", error: "La cantidad es obligatoria" });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };