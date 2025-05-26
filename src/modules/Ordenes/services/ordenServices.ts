import { api } from "../../../configs/api";
import { IOrden } from "../models/Orden";

export class OrdenService {

    private apiURL = "ordenes";

    public async create(data:IOrden) {
        try {
            console.log('Creating orden with data:', data);
            const response = await api.post<IOrden>(`${this.apiURL}`, data)
            console.log('Response:', response.data);
            console.log('orden created successfully.');
            return response.data            
        } catch (error) {
            console.error('Error saving orden:', error);
            throw new Error('Failed to save orden.');
        }
    }

    public async getAll(): Promise<IOrden[]> {
        try {
            const response = await api.get<IOrden[]>(`${this.apiURL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ordens:', error);
            throw new Error('Failed to fetch ordens.');
        }
    }   

    public async getOrdenById(id: number): Promise<IOrden> {
        try {
            const response = await api.get<IOrden>(`${this.apiURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orden by ID:', error);
            throw new Error('Failed to fetch orden by ID.');
        }
    }

    public async update(data:IOrden) {
        try {
            console.log('id de orden',data.id)
            console.log('Update orden with data:', data);
            const response = await api.put(`${this.apiURL}/${data.id}`, data)
            console.log('Response:', response.data);
            console.log('orden updated successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating orden:', error);
            throw new Error('Failed to update orden.');
        }
    }

    public async delete(data:IOrden) {
        try {
            console.log('id de delete',data.id)
            const response = await api.delete<IOrden>(`${this.apiURL}/${data.id}`)
            console.log('Response:', response.data);
            console.log('orden deleted successfully.');
            return response.data            
        } catch (error) {
            console.error('Error updating orden:', error);
            throw new Error('Failed to update orden.');
        }
    }
}