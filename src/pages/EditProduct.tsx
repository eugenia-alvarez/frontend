import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData} from "react-router-dom"
import Error from "../components/Error"
import { updateProduct, getProductById } from "../services/ProductService"
import { Product } from "../types"



export async function loader({params} : LoaderFunctionArgs) {

    if(params.id !== undefined){
        const product = await getProductById(+params.id) //con el + lo convertimos a numero, pq lo recibe como string
        
        if(!product){ //si el producto no existe, nos redirige a la pagina de inicio
            //throw new Response("", {status: 404, statusText: "No encontrado"})
           return redirect("/")
        }
        return product
    }
 
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData()) //recuperamos los datos ingresados en el formulario
    
    let error = ""

    if(Object.values(data).includes("")){
        error = "Todos los campos son obligatorios"
    }

    if(error.length){
        return error
    }

    if(params.id !== undefined){ //params.id, recupera el id que se pasa por la url (en el router podemos ver q en el path(url) se pasa un id)
        await updateProduct(data, +params.id)
        
    //Siempre debemos retorna algo o redireccionar al usuario
    return redirect("/")
    }
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]



function EditProduct() {

    const error = useActionData() as string //para no tener error
    const product = useLoaderData() as Product

  return (
    <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link 
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadouw-sm hover:bg-indigo-500"
                >
                    Volver a Productos
                </Link>
         </div>

         {error && <Error>{error}</Error>}

        <Form
            className="mt-10"
            method="POST"     
        >
        
        <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product.name}
                />
        </div>

        <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product.price}
                />
        </div>


        <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>

                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
        </div>

        <input
        type="submit"
        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        value="Guardar Cambios"
        />


        </Form>
  </>
  )
}

export default EditProduct
