//import { IReceta } from "@/src/screens/Recetas/models/Receta";
//import { RecetaService } from "@/src/services/recetaServices";
import { useState, useEffect } from "react";
import { RecetaService } from "../../../services/recetaServices";
import { IMovimiento } from "../models/Movimiento";
import { MovimientoService } from "../services/movimientoServices";

export default function useMovimientoService( load: boolean = false) {
  const [ movimientos, setMovimientos] = useState<IMovimiento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const movimientosService = new MovimientoService();

  const fetchMovimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Inicio fetch')
      // Simulación de una llamada a una API
      const response = await movimientosService.getAll(); // Corrected type to IMovimiento[]
      setMovimientos(response);
      console.log('cargó')
      //setRecetas(response);
    } catch (err: any) {
      setError("Error al cargar las recetas: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const createMovimiento = async (data:IMovimiento) => {
    try {
      setLoading(true);
      setError(null);
      const response = await movimientosService.create(data)
      console.log(response)
      return response;
    } catch (err: any) {
      setError("Error al crear un movimiento: " + (err?.message || "Unknown error"));
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load &&   fetchMovimientos();
  }, []);

  return { movimientos, loading, error, refetch: fetchMovimientos, createMovimiento };
}