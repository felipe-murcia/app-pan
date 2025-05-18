//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { useState, useEffect } from "react";
import { IReceta } from "../models/Receta";
import { RecetaService } from "../../../services/recetaServices";

export default function useRecetasService( load: boolean = false) {
  const [recetas, setRecetas] = useState<IReceta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const recetasService = new RecetaService();

  const fetchRecetas = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Inicio fetch')
      // Simulación de una llamada a una API
      const response = await recetasService.getAll(); // Corrected type to IReceta[]
      console.log('cargó')
      setRecetas(response);
    } catch (err: any) {
      setError("Error al cargar las recetas: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const saveReceta = async (data:IReceta) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recetasService.create(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al guardar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

    const updateReceta = async (data:IReceta) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recetasService.update(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al actualizar la receta: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  const deleteReceta = async (data:IReceta) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recetasService.delete(data)
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

  return { recetas, loading, error, refetch: fetchRecetas, saveReceta, updateReceta, deleteReceta };
}