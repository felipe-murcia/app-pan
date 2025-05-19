import { useState, useEffect } from "react";
import { IProducto } from "../models/Producto";
import { ProductoService } from "../../../services/productoServices";

export default function useProductosService( load: boolean = false) {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const productosService = new ProductoService();

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Inicio fetch')
      // Simulación de una llamada a una API
      const response = await productosService.getAll(); 
      console.log('cargó')
      setProductos(response);
    } catch (err: any) {
      setError("Error al cargar las productos: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const saveProducto = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.create(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al guardar la producto: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

    const updateProducto = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.update(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la producto: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  const deleteProducto = async (data:IProducto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosService.delete(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la producto: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load && fetchProductos();
  }, []);

  return { productos, loading, error, refetch: fetchProductos, saveProducto, updateProducto, deleteProducto };
}