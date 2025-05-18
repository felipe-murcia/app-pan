
export interface IIngrediente {
    nombre: string,
    cantidad: number,
    tipoDeUnidad?: string,
}
export interface IReceta {
    id?:number,
    nombre: string,
    temperatura: number,
    tiempo: number,
    conPicada: boolean,
    picada: number,
    observacion: string,
    cantidad: number,
    ingredientes: IIngrediente[]
}