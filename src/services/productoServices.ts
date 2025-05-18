
import { api } from "../configs/api";
import { IProducto } from "../modules/Productos/models/Producto";

export class ProductoService {

    private apiURL = "productos";
 
    public async create(data:IProducto) {
        try {
            console.log('Creating receta with data:', data);
            const response = await api.post<IProducto>(`${this.apiURL}`, data)
            console.log('Response:', response.data);
            console.log('Receta created successfully.');
            return response.data            
        } catch (error) {
            console.error('Error saving receta:', error);
            throw new Error('Failed to save receta.');
        }
    }

    public async getAll(): Promise<IProducto[]> {
        try {
            const response = await api.get<IProducto[]>(`${this.apiURL}`)
            return response.data;
        } catch (error) {
            console.error('Error fetching recetas:', error);
            throw new Error('Failed to fetch recetas.');
        }
    }   

    public async getProductiById(id: number): Promise<IProducto> {
        try {
            const response = await api.get<IProducto>(`${this.apiURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching receta by ID:', error);
            throw new Error('Failed to fetch receta by ID.');
        }
    }

    public async update(data:IProducto) {
        try {
            const response = await api.put(`${this.apiURL}/${data.id}`, data)
            console.log('Response:', response.data);
            console.log('Receta updated successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating receta:', error);
            throw new Error('Failed to update receta.');
        }
    }

    public async delete(data:IProducto) {
        try {
            console.log('id de delete',data.id)
            const response = await api.delete(`${this.apiURL}/${data.id}`)
            console.log('Response:', response.data);
            console.log('Receta updated successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating receta:', error);
            throw new Error('Failed to update receta.');
        }
    }
}