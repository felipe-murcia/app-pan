
export interface IIngrediente {
    nombre: string,
    cantidad: number
}
export interface IReceta {
    nombre: string,
    temperatura: number,
    tiempo: number,
    conPicada: boolean,
    picada: number,
    observacion: string,
    cantidad: number,
    ingredientes: IIngrediente[]
}