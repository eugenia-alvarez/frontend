import { safeParse } from "valibot";
import axios from "axios"
import { DraftProductSchema , ProductsSchema, Product, ProductSchema} from "../types"
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData){
    
    try{
        //Antes de enviar la peticion hacia la API, debemos validar
    //Para la creacion de un producto solo necesitamos el name y el price. El id lo crea en automatico la base de datos y la availability tiene su valor por default
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price //le colocamos el + para convertirlo en numero. Ya que cuando se recupera el valor, se recupera como string
        })
        
        if(result.success){
            //si el resultado es success, enviamos la peticion a la rest api
            const url = `${import.meta.env.VITE_API_URL}/products`
                await axios.post(url, {
                name: result.output.name,
                price: result.output.price
             })

        } else{
            throw new Error("Datos no válidos")
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function getProducts(){
    try{
        const url = `${import.meta.env.VITE_API_URL}/products`
        const {data} = await axios(url)
       const result = safeParse(ProductsSchema, data.data) //ProductsSchema, es el schema de array de objetos

       if(result.success){
        return result.output //result.ouput regresa la informacion hacia el loader
       }
       else{
        throw new Error("Hubo un error")
       }
    }
    catch(error){
        console.log(error)
    }
}

export async function getProductById(id : Product["id"]){
    try{
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`
        const {data} = await axios(url)
       const result = safeParse(ProductSchema, data.data) //ProductSchema, es el schema del objeto
        
       
       if(result.success){
        return result.output //result.ouput regresa la informacion hacia el loader
       }
       else{
        throw new Error("Hubo un error")
       }
    }
    catch(error){
        console.log(error)
    }
}

export async function updateProduct( data : ProductData,  id : Product["id"]){ //data son los datos actualizados que el usuario ingresa en el form
    try{
        const result = safeParse(ProductSchema, {
            id: id,
            name: data.name,
            price: +data.price, //lo recibimos como string, por ello lo convertimos a numero con el +
            availability: toBoolean(data.availability.toString()) //lo recibimos como string, y lo convertimos a boolean 
        }) //ProductSchema, es el schema del objeto

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/products/${id}`
                await axios.put(url, result.output)
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function deleteProduct(id: Product["id"]){
    
    try{
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`
        await axios.delete(url)

    }
    catch(error){
        console.log(error)
    }
}

export async function patchAvailability(id : Product["id"]){
    try{
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`
        await axios.patch(url)
    }
    catch(error){
        console.log(error)
    }
}