import React from 'react';
import './styles.css';
import logoCadastro from '../../assets/cadastro.png'
import { Link } from 'react-router-dom';
import { FiEdit, FiUser, FiXCircle } from 'react-icons/fi';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function Filmes(){
  return(
     <div className='filme-container'>
        <header>
          <img src={logoCadastro} alt='Cadastro'/>
          <span>Benm vindo, <strong>Tamiris</strong></span> 
        
          {localStorage.roles === 'admin' && (
          <Link className='button' to="../filme/novo/0">Novo Filme</Link>
          )}
          <button type='button'>
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
          <li>
            <b>Título:</b>Vaca Louca<br/><br/>
            <b>Genero:</b>Comédia<br/><br/>
            <b>Ano:</b>2000<br/><br/>
            <button type='button'>
            <FiEdit size="25" color="#0000ff" />
            </button>
            <button type='button'>
            <FiUser size="25" color="#0000ff" />
          </button>
          </li>
          <li>
            <b>Título:</b>Vaca Louca<br/><br/>
            <b>Genero:</b>Comédia<br/><br/>
            <b>Ano:</b>2000<br/><br/>
            <button type='button'>
            <FiEdit size="25" color="#0000ff" />
            </button>
            <button type='button'>
            <FiUser size="25" color="#0000ff" />
          </button>
          </li>
        </ul>
     </div>
  )
  
}