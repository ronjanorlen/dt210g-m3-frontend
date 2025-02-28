import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa context 
const AuthContext = createContext<AuthContextType | null>(null);

// Vad ska skickas ut till komponent som använder provider
interface AuthProviderProps {
    children: ReactNode
}

// Provider 
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { // Returnera en reactfunktions-komponent, ta emot children (reactNodes)

    const [user, setUser] = useState<User | null>(null);

    // Metod för att logga in 
    const login = async (credentials: LoginCredentials): Promise<void> => {

        try {
            const res = await fetch("https://dt210g-m3-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: "include" // Skicka med cookie
            })

            // Om inte ok
            if (!res.ok) throw new Error("Misslyckad inloggning");

            // Om ok 
            const data = await res.json() as AuthResponse;
            console.log("Data från inloggning: ", data);

            // Statea användare 
            if (data.user) {
                setUser(data.user);
            } else {
                console.error("Misslyckad inloggning: ingen data från inloggning");
                throw new Error("Inloggning misslyckades");
            }

            // Fånga upp fel 
        } catch (error) {
            console.error("Fel i catch: ", error);
            throw new Error("Fel i catch");
        }
    }

    // Metod för att kontrollera om användaren är inloggad och slippa logga in på nytt vid sidomladdning
    const checkToken = async () => {
        try {
            const res = await fetch("https://dt210g-m3-backend.onrender.com/checkUser", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Hittade ingen session"); // Vid ev fel 

            const data = await res.json();
            setUser(data.user);

            // Fånga fel 
        } catch (error) {
            console.error("Något gick fel vid kontroll av session");
            setUser(null);
        }
    }

    // Anropa checkToken
    useEffect(() => {
        checkToken();
    }, [])

    // Metod för att logga ut 
    const logout = async () => {
        try {
            const res = await fetch("https://dt210g-m3-backend.onrender.com/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (!res.ok) throw new Error("Misslyckad utloggning");

            setUser(null);
            // Fånga fel 
        } catch (error) {
            console.error("Fel vid utloggning: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook för användning av authContext 
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}