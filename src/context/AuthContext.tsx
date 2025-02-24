import { createContext, useState, useContext, ReactNode } from "react"; 
import {User, LoginCredentials, AuthResponse, AuthContextType} from "../types/auth.types";

// Skapa context 
const AuthContext = createContext <AuthContextType | null>(null);

// Vad ska skickas ut till komponent som använder provider
interface AuthProviderProps {
    children: ReactNode 
}

// Provider 
export const AuthProvider: React.FC<AuthProviderProps> = ( {children }) => { // Returnera en reactfunktions-komponent, ta emot children (reactNodes)

    const [user, setUser] = useState<User | null>(null);

    // Metod för att logga in 
    const login = async (credentials: LoginCredentials) => {

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            // Om inte ok
            if(!res.ok) throw new Error("Misslyckad inloggning");

            // Om ok 
            const data = await res.json() as AuthResponse;

            localStorage.setItem("token", data.token);
            setUser(data.user);

        // Fånga upp fel 
        } catch(error) {
            throw error;
        }
    }

    // Metod för att logga ut 
    const logout = () => {
        localStorage.removeItem("token"); // Ta bort token 

        setUser(null); // Nollställ användare 
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}