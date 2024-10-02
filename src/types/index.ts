import {object, array, string, number, boolean, InferOutput} from "valibot"


export const DraftProductSchema = object({
    name: string(),
    price: number()
})



export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
})


//Schema para Arrgelo con objetos, porque de la base de datos, recibimos un arreglo con los productos que son objetos
export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>
