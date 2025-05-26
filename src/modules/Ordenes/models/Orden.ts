import { IProducto } from "../../Productos/models/Producto";
import { IReceta } from "../../Recetas/models/Receta";

export interface IOrden {
    id?:number,
    estado: number,
    observacion: string,
    cantidadInicial: number,
    cantidadFinal: number,
    productoId: number,
    recetaId: number,
    producto?: IProducto,
    receta?: IReceta,
    createdAt: string,
}