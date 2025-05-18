//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { useState, useEffect } from "react";
import { IProducto } from "../models/Producto";
import { ProductoService } from "../../../services/productoServices";

export default function useRecetasService( load: boolean = false) {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const productosService = new ProductoService();

  const fetchRecetas = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Inicio fetch')
      // Simulación de una llamada a una API
      const response = await productosService.getAll(); // Corrected type to IReceta[]
      console.log('cargó')
      setProductos(response);
    } catch (err: any) {
      setError("Error al cargar las recetas: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const saveReceta = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.create(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al guardar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

    const updateReceta = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.update(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  const deleteReceta = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.delete(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load && fetchRecetas();
  }, []);

  return { productos, loading, error, refetch: fetchRecetas, saveReceta, updateReceta, deleteReceta };
}