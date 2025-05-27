export interface Estado {
  id: number;
  nombre: string;
  color: string;
  icono: string;
}

export const ESTADOS: Estado[] = [
  {
    id: 1,
    nombre: 'Pendiente',
    color: '#5B9B4D',     // amarillo
    icono: 'clock',
  },
  {
    id: 2,
    nombre: 'En proceso',
    color: '#EBBD41',     // azul
    icono: 'loader',
  },
  {
    id: 3,
    nombre: 'Finalizado',
    color: '#10b981',     // verde
    icono: 'check-circle',
  },
  {
    id: 4,
    nombre: 'Cancelado',
    color: '#AE2029',     // rojo
    icono: 'x-circle',
  },
];
