import { Link, Form, useActionData, useLoaderData} from "react-router-dom"
import Error from "../components/Error"
import { Product } from "../types"




function ProductForm() {

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


        <input
        type="submit"
        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        value="Guardar Cambios"
        />


        </Form>
  </>
  )
}

export default ProductForm
