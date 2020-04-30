import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 

import {v4 as uuid} from 'uuid'

import './styles.css';

const myId = uuid(); //para gerar id a cada mensagem

const socket = io('http://localhost:3333');//backend
socket.on('connect', () => console.log("[IO] Connect => New connection"));


export default function Chat(data) {

    const name = localStorage.getItem('name'); //resgatando o nome do user

    if(!name){
        alert("É necessário informar seu nome");

    }

    const [message, updateMessage] = useState(''); //oq for digitado guarda aq
    const [messages, updateMessages] = useState([]); //todas mensagens

    useEffect(() => {
        const handleNewMessage = newMessage =>    //para att mensagens
            updateMessages([...messages, newMessage]) // '...' concatena todas as outras mensagens, com a atual
        
            socket.on('sendMessage', handleNewMessage); //me conecto pra enviar
            return () => socket.off('sendMessage', handleNewMessage); //e desconecto, pq ja enviei
    }, [messages])


    const handleFormSubmit = event => {
        event.preventDefault();
    
        //checando se tem mensagem
        if(message.trim()){

            socket.emit('sendMessage', { //sendMessage, é o evento q recebo do backend
                id: myId,
                message,
                name
            }) 

            updateMessage(''); //para limpar o input assim q for submitado
        }
    }

    const handleInputChange = event =>
        updateMessage(event.target.value)


    return (
        <main className="containerChat">
            <h2>
                Olá <strong>{name}</strong>, você está online e pronto(a) pra enviar mensagem!
            </h2>
            <ul className="list">
                {messages.map((m, index) => ( //percorrendo o estado de mensagens, e pegando um id diferente pra cada mensagem
                    <li 
                        className={`
                            listItem listItem-${m.id === myId ? 'mine' : 'other'} 
                        `} //se o id da mensagem, for igual o meu, a mensagem e minha kk
                        key={index} //id da mensagem, obrigatório para referencia (tem que passar no primeiro elemento que interação renderiza)
                    >
                        <div className="person"> <strong>{name}</strong> disse: </div>
                        <span   
                            className={`
                                message message-${m.id === myId ? 'mine' : 'other'}
                            `}
                        
                        >
                              {m.message} 
                        
                        </span>
                    </li>
                ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    onChange={handleInputChange}
                    value={message}
                    className="formField"
                    placeholder="Digite sua mensagem:"
                    type="text"
                />
                <button className="button" type="submit">Enviar</button>
            </form>
        </main>
    );
}