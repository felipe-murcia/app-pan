import { IReceta } from "@/src/screens/Recetas/models/Receta";
import { api } from "../configs/api";

export class RecetaService {

    private apiURL = "recetas";
 
    public async create(data:IReceta) {
        try {
            console.log('Creating receta with data:', data);
            const response = await api.post<IReceta>(`${this.apiURL}`, data)
            console.log('Response:', response.data);
            console.log('Receta created successfully.');
            return response.data            
        } catch (error) {
            console.error('Error saving receta:', error);
            throw new Error('Failed to save receta.');
        }
    }

    public async getAll(): Promise<IReceta[]> {
        try {
            const response = await api.get<IReceta[]>(`${this.apiURL}`)
            return response.data
        } catch (error) {
            console.error('Error fetching recetas:', error);
            throw new Error('Failed to fetch recetas.');
        }
    }   

    public async getRecetasById(id: number): Promise<IReceta> {
        try {
            const response = await api.get<IReceta>(`${this.apiURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching receta by ID:', error);
            throw new Error('Failed to fetch receta by ID.');
        }
    }
}