import { IProducto } from "../modules/Productos/models/Producto";
import { IReceta } from "../modules/Recetas/models/Receta";

export type RootStackParamList = {
  Ordenes: undefined;
  RecetaList: undefined;
  Inventario: undefined;
  Movimientos: undefined;
  Main: undefined;
  RecetaCreate: {
    onRefresh: () => void;
  };
  RecetaEdit: {
    receta: IReceta,
    onRefresh: () => void;
  };
  ProductoScreen: undefined,
  ProductoCreate: {
    onRefresh: () => void;
  };
  ProductoEdit: {
    producto: IProducto,
    onRefresh: () => void;
  };
};