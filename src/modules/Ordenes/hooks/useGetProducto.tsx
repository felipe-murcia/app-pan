import { useState, useEffect } from "react";
import { ProductoService } from "../../../services/productoServices";
import { IProducto } from "../../Productos/models/Producto";

export default function useGetProducto() {
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

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error, refetch: fetchProductos  };
}