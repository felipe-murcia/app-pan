//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { useState, useEffect } from "react";
import { RecetaService } from "../../../services/recetaServices";
import { IReceta } from "../../Recetas/models/Receta";

export default function useGetReceta() {
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

  useEffect(() => {
    fetchRecetas();
  }, []);

  return { recetas, loading, error, refetch: fetchRecetas };
}