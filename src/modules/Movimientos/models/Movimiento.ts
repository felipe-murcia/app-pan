import { IProducto } from "../../Productos/models/Producto";

export interface IMovimiento {
    id?:number,
    tipo: boolean, // true: entrada, false: salida
    concepto: string,
    cantidad: number,
    productoId: number,
    producto?: IProducto,
    createdAt?: string,
}