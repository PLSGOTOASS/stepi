import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = () => {
        axios.post('http://localhost:8080/signup', {
            login: username,
            password: password
        })
            .then(response => {
                console.log(response.data);
                setUsername('');
                setPassword('');
                window.location.href = '/'; // Redirect to home page
            })
            .catch(error => {
                setError(error.response.data.message); // Save registration error
            });
    };

    const handleBackToHome = () => {
        window.location.href = '/';
    };

    return (
        <div>
            <h2>Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="login"
            />
            <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default RegisterPage;