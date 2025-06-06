//import { IReceta } from "@/src/screens/Recetas/models/Receta";
import { IIngrediente } from "../modules/Recetas/models/Receta";
import { IReceta } from "../modules/Recetas/models/Receta";
import { api } from "../configs/api";

export class RecetaService {

    private apiURL = "recetas";
 
    public async create(data:IReceta) {
        try {
            console.log('Creating receta with data:', data);
            const newData = { ...data, ingredientes: JSON.stringify(data.ingredientes)}
            const response = await api.post<IReceta>(`${this.apiURL}`, newData)
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
            //return response.data.map((item)=>{ item.ingredientes = JSON.parse(item?.ingredientes)})
            const parsedData = response.data.map(item => ({
                ...item,
                ingredientes: JSON.parse(item?.ingredientes.toString()),
            }));
            return parsedData
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

    public async update(data:IReceta) {
        try {
            console.log('id de receta',data.id)
            console.log('Update receta with data:', data);
            const newData = { ...data, ingredientes: JSON.stringify(data.ingredientes)}
            const response = await api.put(`${this.apiURL}/${data.id}`, newData)
            console.log('Response:', response.data);
            console.log('Receta updated successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating receta:', error);
            throw new Error('Failed to update receta.');
        }
    }

    public async delete(data:IReceta) {
        try {
            console.log('id de delete',data.id)
            const response = await api.delete<IReceta>(`${this.apiURL}/${data.id}`)
            console.log('Response:', response.data);
            console.log('Receta updated successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating receta:', error);
            throw new Error('Failed to update receta.');
        }
    }
}