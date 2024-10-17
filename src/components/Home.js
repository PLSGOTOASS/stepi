import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>stepan's todo list</h1>
            <button onClick={() => navigate('/login')}>log in</button>
            <button onClick={() => navigate('/register')}>sign in</button>
        </div>
    );
};

export default Home;