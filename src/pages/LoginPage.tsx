import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Definiera props som hämtas från useAuth 
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Kontrollera användare och skicka till produktsidan om inloggad
    useEffect(() => {
        if (user) {
            navigate("/products");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password }); // Skicka med credentials
            // skicka användare vidare till produktsida 
            navigate("/products");
            // Fånga fel
        } catch (error) {
            setError("Felaktiga inloggningsuppgifter")

        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2><i className="fa-solid fa-user"></i> Logga in</h2>

                <form className="loginForm" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-msg">
                            {error}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">E-postadress</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Lösenord</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="loginBtn" type="submit">
                        <i className="fa-solid fa-arrow-right"></i> Logga in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage