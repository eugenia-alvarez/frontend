import { useNavigate, Form, ActionFunctionArgs , redirect, useFetcher} from 'react-router-dom'
import { Product } from '../types'
import { formatCurrency } from '../utils'
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product : Product
}

export async function action({ params} : ActionFunctionArgs){
  if(params.id !== undefined){
    await deleteProduct(+params.id)
    return redirect("/")
  }

}


function ProductDetails({product} : ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = product.availability

  return (

        <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">

          <fetcher.Form method='POST'> 

            <button 
            type='submit' 
            name='id' //el name es lo que se manda al servidor
            value={product.id} //toString pq availability es boolean, y value espera un string (html no puede leer boolean ni numeros, todo lo trata como string)
            className={`${isAvailability ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
            >
             {product.availability ? "Disponible" : "No Disponible"}
            </button>

          </fetcher.Form>

        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className='flex gap-2 items-center'>

            <button
             onClick={() => navigate(`/productos/${product.id}/editar`)}
             className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
             >
                Editar
             </button>

            <Form
              className='w-full'
              method='POST'
              action={`/productos/${product.id}/eliminar`}

              onSubmit={(e) => {
                if(!confirm("¿Eliminar?")){
                  e.preventDefault()
                }
              }} //onSubmit se ejecuta ANTES que el action. Entonces vamos a preguntar si esta seguro de eliminar el producto
            >

              <input 
                type='submit'
                className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                value="Eliminar"
              />
            </Form>
          </div>
        </td>
    </tr> 

  )
}

export default ProductDetails
