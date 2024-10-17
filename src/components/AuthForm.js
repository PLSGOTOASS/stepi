import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './CreateContext';

function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const sendLoginRequest = (data) => {
        axios.post('http://localhost:8080/login', data)
            .then((response) => {
                authContext.setUsername(data.login);
                navigate('/todo');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const exceptionDto = error.response.data;
                    const errorMessage = exceptionDto.message;
                    const errorStatus = exceptionDto.status;
                    setError(errorMessage);
                } else {
                    setError('An unknown error occurred');
                }
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { login: username, password: password };
        sendLoginRequest(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/')}>Back to Home</button>
        </form>
    );
}

export default AuthForm;
