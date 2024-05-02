// Home.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleStartChat = () => {
        if (user.trim() !== '') {
            // Redireciona para a tela de chat passando o nome de usu�rio como par�metro
            navigate(`/chat/${user}`);
        } else {
            alert('Por favor, insira seu nome de usu�rio.');
        }
    };

    return (
        <div>
            <h1>Bem-vindo ao Chat App</h1>
            <input
                type="text"
                placeholder="Digite seu nome de usu�rio"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={handleStartChat}>Come�ar Chat</button>
        </div>
    );
};

export default Home;
