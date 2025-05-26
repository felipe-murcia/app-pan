import { Estado, ESTADOS } from "../interfaces/Estados";

export const getEstado = (id: number): Estado | undefined => {
  return ESTADOS.find(estado => estado.id === id);
};