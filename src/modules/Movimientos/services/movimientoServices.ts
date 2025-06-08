import { api } from "../../../configs/api";
import { IMovimiento } from "../models/Movimiento";

export class MovimientoService {

    private apiURL = "movimientos";

    public async create(data:IMovimiento) {
        try {
            console.log('Creating movimiento with data:', data);
            const response = await api.post<IMovimiento>(`${this.apiURL}`, data)
            console.log('Response:', response.data);
            console.log('movimiento created successfully.');
            return response.data            
        } catch (error) {
            console.error('Error saving orden:', error);
            throw new Error('Failed to save orden.');
        }
    }

    public async getAll(): Promise<IMovimiento[]> {
        try {
            const response = await api.get<IMovimiento[]>(`${this.apiURL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movimientos:', error);
            throw new Error('Failed to fetch movimientos.');
        }
    }   

}