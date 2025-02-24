import { createBrowserRouter } from "react-router-dom"; // Importera router-paket 
import HomePage from "./pages/HomePage"; // Importera startsida
import LoginPage from "./pages/LoginPage"; // Importera logga in-sida 
import ProductPage from "./pages/ProductPage"; // Importera produktsida 
import Layout from "./components/Layout"; // Importera Layout-fil 
import ProtectedRoute from "./components/ProtectedRoute"; // importera skyddad route 

// Routing med Layout som standardfil
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/products",
                element: (
                    <ProtectedRoute>
                        <ProductPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
])

export default router;