import React, { useEffect, useState } from 'react';
import './styles.css';
import logoCadastro from '../../assets/cadastro.png'
import { Link} from 'react-router-dom';
import api from '../../services/api';
import {FiDelete, FiEdit, FiXCircle } from 'react-icons/fi';
import{useNavigate} from 'react-router-dom';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function Filmes(){

  //filtrar dados  definindo 2 estados para controlar o filtro
  const[searchInput, setSearchInput] = useState('');
  const[filtro, setFiltro] = useState([]);
  
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
//buscarFilme(valor usado para criterio)
//verificando se o searchInput não é igual a vazio se for diferente de vazio setFiltro(filme)
//usando a função filter os dados do array contendo todos o filmes com base na entrada do usuario
//filme  é o array com os dados de todos os alunos
const buscarFilme = (valorBusca) =>{
  setSearchInput(valorBusca);
  if (searchInput !== '') {
    const dadosFiltrados = filme.filter( (item) =>{
      return Object.values(item).join('').toLowerCase()
      .includes(searchInput.toLowerCase())
    });
    setFiltro(dadosFiltrados);
  }else
  {
    setFiltro(filme);
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

  async function editarFilmes(id) {
    try {
      navegacao(`../filme/novo/${id}`)
    } catch (error) {
      alert('Não foi possível editar o filme' + error)
    }
  }

  async function deleteFilmes(id) {
    try {
      if (window.confirm('Deseja deletar o Filme de id = ' + id + ' ?')) {
        await api.delete(`api/Filme/${id}`, authorization);
        setFilmes(filme.filter(filme => filme.id !== id));
      }

    } catch (error) {
      alert('Não foi possível editar o filme' + error);
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
          <input type='text' placeholder='Titulo'
          onChange={(e) => buscarFilme(e.target.value)}
          />
        </form>
        <h1>Relação de Filmes</h1>
        
        {searchInput.length > 1 ?(
            <ul>
            {filtro.map(filme=>(
  
              <li key={filme.filmeModelId}>
              <b>Título:</b>{filme.titulo}<br/><br/>
              <b>Genero:</b>{filme.genero}<br/><br/>
              <b>Ano:</b>{filme.ano}<br/><br/>
  
              <button  onClick={()=> editarFilmes(filme.filmeModelId)} type='button'>
              <FiEdit size="25" color="#0000ff" />
              </button>
  
              <button onClick={()=> deleteFilmes(filme.filmeModelId)} type='button'>
              <FiDelete size="25" color="#0000ff" />
              </button>
            
            </li>
              ))}
          </ul>
        ): (
        <ul>
          {filme.map(filme=>(

            <li key={filme.filmeModelId}>
            <b>Título:</b>{filme.titulo}<br/><br/>
            <b>Genero:</b>{filme.genero}<br/><br/>
            <b>Ano:</b>{filme.ano}<br/><br/>

            <button  onClick={()=> editarFilmes(filme.filmeModelId)} type='button'>
            <FiEdit size="25" color="#0000ff" />
            </button>

            <button onClick={()=> deleteFilmes(filme.filmeModelId)} type='button'>
            <FiDelete size="25" color="#0000ff" />
            </button> 

        
          </li>
            ))}
        </ul>
        )}
     </div>
    );
}