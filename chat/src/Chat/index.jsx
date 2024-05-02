import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useParams } from 'react-router-dom'; // Certifique-se de importar o useParams


const Chat = () => {
    const { user } = useParams();  
    
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
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

                    await connection.on('ReceberMensagem', (user, message) => {
                        setMessages(prevMessages => [...prevMessages, { user, message }]);
                    });
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
        <div>
            <div>
                <div className="bg-gray-100 h-screen flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-md w-96 h-96 flex flex-col">
                        <div className="bg-gray-200 py-2 px-4 rounded-t-lg">
                            <h1 className="text-lg font-semibold text-gray-800">Chat de Conversa</h1>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-2">
                            <div className="flex flex-col space-y-2">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`bg-${msg.user === 'Você' ? 'blue' : 'green'}-100 py-2 px-4 rounded-lg max-w-xs self-${msg.user === 'Você' ? 'start' : 'end'}`}>
                                        <p className={`text-sm text-${msg.user === 'Você' ? 'blue' : 'green'}-800`}>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-200 py-2 px-4 rounded-b-lg">
                            <form className="flex">
                                <input type="text" placeholder="Digite sua mensagem..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none" />
                                <button type="button" onClick={sendMessage} className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="flex flex-col">
               
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

        </div>
    );
};

export default Chat;
