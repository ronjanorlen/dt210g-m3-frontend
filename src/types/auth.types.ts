export interface User {
    id: string,
    email: string,
    password: string
}

// upppgifter som skickas till backend
export interface LoginCredentials { 
    email: string,
    password: string
}

// Uppgifter som vi får från backend 
export interface AuthResponse {
    user: User,
    token: string
}

// Definiera context-fil - vad den innehåller 
export interface AuthContextType {
    user: User | null, // Antingen en användare med props eller null 
    // Metod för inloggning
    login: (credentials: LoginCredentials) => Promise<void>;
    // Metod för utloggning
    logout: () => void;
}
