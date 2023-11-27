import React, { useEffect, useState } from 'react';
import './styles.css';
import logoCadastro from '../../assets/cadastro.png'
import { Link} from 'react-router-dom';
import api from '../../services/api';
import {FiDelete, FiEdit, FiXCircle } from 'react-icons/fi';
import{useNavigate} from 'react-router-dom';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function Filmes(){
  const[titulo,setTitulo]=useState('');
  const[filme, setFilmes] = useState([]);
  const login = localStorage.getItem('login');
  const roles = localStorage.getItem('roles');
  const token = localStorage.getItem('token');
  const navegacao = useNavigate();

const authorization = {
  headers:{
    Authorization: `Bearer ${token}`
  }
}
  // o hook useEfect é usado para tratar os efeitos colaterais nos componentes 
  //acessando api pegando todos os filmes pasando o token
  // no response pegamos o retorno da api  e chamos o setFilmes para atualizar os  estado da variavel filmes
  useEffect( () =>{
    api.get('api/Filme/Filmes',authorization).then(
      response=> {setFilmes(response.data)
      }, token)
  })

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem('token','');
      authorization.headers ='';
      navegacao('/');
    } catch (error) {
      alert('Não for possível fazer o lougout' + error);
    }
  }

  return(
     <div className='filme-container'>
        <header>
          <img src={logoCadastro} alt='Cadastro'/>
          <span>Bem vindo, <strong>{login}</strong></span> 
        
          {roles === 'admin' && (
          <Link className='button' to="../filme/novo/0">Novo Filme</Link>
          )}
          <button onClick={logout} type='button'>
            <FiXCircle size="35" color="#17202a"/>
          </button>
        </header>
        <form>
          <input type='text' placeholder='Titulo'/>
          <button type='button' class='button'>
            Filtrar Filme pelo Titulo
          </button>
        </form>
        <h1>Relação de Filmes</h1>
        <ul>
          {filme.map(filme=>(
            <li key={filme.FilmeModelId}>
            <b>Título:</b>{filme.titulo}<br/><br/>
            <b>Genero:</b>{filme.genero}<br/><br/>
            <b>Ano:</b>{filme.ano}<br/><br/>
            <button type='button'>
            <FiEdit size="25" color="#0000ff" />
            </button>
            <button type='button'>
            <FiDelete size="25" color="#0000ff" />
          </button>
          
          </li>
            ))}
        </ul>
     </div>
  )
  
}