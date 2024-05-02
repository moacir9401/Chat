import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chat from './Chat';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <h1 className="bg-sky-500">Chat em Tempo Real</h1>

        <Chat />
  </React.StrictMode>,
)
