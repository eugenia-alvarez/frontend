import {createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout"
import Products, {loader as productsLoader, action as productUpdateAvailabilityAction} from "./pages/Products"
import NewProduct, { action as newProductAction} from "./pages/NewProduct"
import EditProduct, {loader as productEditLoader, action as productEditAction} from "./pages/EditProduct"
import {action as productDeleteAction} from "./components/ProductDetails"

export const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: productUpdateAvailabilityAction
            
            },
            {
                path: "/productos/nuevo",
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: "/productos/:id/editar", // ROA Pattern - Resource-oriented design
                element: <EditProduct/>,
                loader: productEditLoader,
                action: productEditAction
            },
            {
                path: "/productos/:id/eliminar",
                action: productDeleteAction
            }
        ]
    }
])