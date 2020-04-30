import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import image from '../../assets/image.svg';

export default function Login() {
    
    const [name, setName] = useState(''); 

    const history = useHistory(); //PARA REDIRECIONAMENTO

    function handleUser(e){
        e.preventDefault(); 
        const data = { name }; //VALOR DA VARIAVEL  

        if(name.length < 1){
            alert("O campo nome não pode ser vazio, preencha-o para prosseguir")
        }
        else{
            localStorage.setItem('name', data.name);
            history.push("/chat", data);
        }
    }
    
    return (
        <div className="container">
            <img src={image} alt="Imagem de Login"/>

            <div className="content">
                <h2>Nos informe seu nome para entrar no chat :)</h2>
                <form onSubmit={handleUser}> 
                    <input 
                        type="text" 
                        placeholder="Digite seu nome:" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    /> <br />

                    <button type="submit">Entrar</button>
                </form>

                <footer>
                    <p>by <a target="__blank" href="https://github.com/vitorrubim1">Vitor Rubim</a></p>
                </footer>
            </div>
        </div>
    );
}