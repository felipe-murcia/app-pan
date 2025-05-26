//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { useState, useEffect } from "react";
import { RecetaService } from "../../../services/recetaServices";
import { IOrden } from "../models/Orden";
import { OrdenService } from "../services/ordenServices";

export default function useOrdenService( load: boolean = false) {
  const [ordenes, setOrdenes] = useState<IOrden[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ordenesService = new OrdenService();

  const fetchRecetas = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Inicio fetch')
      // Simulación de una llamada a una API
      const response = await ordenesService.getAll(); // Corrected type to IReceta[]
      setOrdenes(response);
      console.log('cargó')
      //setRecetas(response);
    } catch (err: any) {
      setError("Error al cargar las recetas: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const saveOrden = async (data:IOrden) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordenesService.create(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al guardar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

    const updateOrden = async (data:IOrden) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordenesService.update(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  const deleteOrden = async (data:IOrden) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordenesService.delete(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la orden: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load && fetchRecetas();
  }, []);

  return { ordenes, loading, error, refetch: fetchRecetas, saveOrden, updateOrden, deleteOrden };
}