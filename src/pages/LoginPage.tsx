import { useState } from "react";



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Logg in</h2>

                <form onSubmit={handleSubmit}>
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
                    <button type="submit">
                        Logga in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage