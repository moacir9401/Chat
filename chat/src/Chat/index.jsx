import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7136/chatHub') // Substitua pelo seu URL do SignalR
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection && connection.state === HubConnectionState.Connected) {
            connection.on('ReceberMensagem', (user, message) => {
                setMessages([...messages, { user, message }]);
            });
        }
    }, [connection, messages]);

    const sendMessage = async () => {
        if (message.trim() !== '') {
            await connection.send('EnviarMensagem', user, message);
            setMessage('');
        }
    };
    useEffect(() => {
        const startConnection = async () => {
            if (connection) {
                try {
                    await connection.start();
                    console.log('Connection started successfully!');
                } catch (error) {
                    console.error('Error starting connection:', error);
                }
            }
        };

        startConnection();
    }, [connection]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    return (
        <div className="flex flex-col">
    <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
    />
    <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
    />
    <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
    >
        Send
    </button>
    <hr className="my-4" />
    {messages.map((msg, index) => (
        <div key={index} className="mb-2">
            <strong>{msg.user}: </strong>
            {msg.message}
        </div>
    ))}
</div>

    );
};

export default Chat;
