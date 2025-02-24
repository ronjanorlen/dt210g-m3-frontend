import { Navigate } from "react-router-dom"; // För att kunna skicka vidare användare 
import { ReactNode } from "react"; // För interfaces 
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // läs in context-fil 
    const { user } = useAuth(); // Kolla om det finns inloggad användare, annars null
    // Kolla om användare INTE finns, isf skicka till logga in-sida
    if (!user) {
        return <Navigate to="/login" replace /> // Ersätt nuvarande url till login 
    }

    // Rendera element - får komma åt skyddad sida 
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute