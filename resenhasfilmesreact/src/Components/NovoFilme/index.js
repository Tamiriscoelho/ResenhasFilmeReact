import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function NovoFilme(){

  //é necessario definir um estado para que se possa editar os dados
  const[filmeModelId, setFilmeModelId]= useState(null);
  const[titulo, setTitulo]= useState('');
  const[genero, setGenero]= useState('');
  const[ano, setAno]= useState('');

  const {filmeId} = useParams();
  const navegacao = useNavigate();

const token = localStorage.getItem('token');
const authorization = {
  headers:{
    Authorization: `Bearer ${token}`
  }
}

useEffect(() =>{
  if (filmeId === '0') 
    return;
  else
    carregaFilme();
}, filmeId)

async function carregaFilme(){
  try {
    const response = await api.get( `api/Filme/${filmeId}`,authorization);
    setFilmeModelId(response.data.filmeModelId);
    setTitulo(response.data.titulo);
    setGenero(response.data.genero);
    setAno(response.data.ano); 
  } catch (error) {
    alert('Erro ao recuperar o filme' + error);
    navegacao('/filmes')
  }
}

async function saveOrUpdate(event){
  event.preventDefault();
    const data ={
      titulo,
      genero,
      ano
    }

    try {
      if (filmeId === '0') {
          await api.post('api/Filme', data, authorization)
      }
      else
      {
         data.filmeModelId = filmeModelId;
         await api.put(`api/filme/${filmeModelId}`,data, authorization);
      }
      
    } catch (error) {
      alert('Erro ao gravar filme ' + error)
    }
    navegacao('/filmes');

}

  return(
     <div className='novo-filme-container'>
      <div className='content'>
         <section className='form'>
          <FiUserPlus size="105" color='#17202a'/>
          <h1>{filmeId === '0' ? 'Incluir Novo Filme' : 'Editar Filme'}</h1>
          <Link className='back-link' to="/filmes"> 
          <FiCornerDownLeft size="25" color='#17202a'/>
            Retornar
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input placeholder='Título'
              value={titulo}
              onChange = {e => setTitulo(e.target.value)}
          />
          <input placeholder='Genero'
              value={genero}
              onChange = {e => setGenero(e.target.value)}
          />
          <input placeholder='Ano'
              value={ano}
              onChange = {e => setAno(e.target.value)}
          />
          <button className='button' type='submit'>{filmeId === '0' ? 'Incluir' : 'Editar '}</button>
        </form>
      </div>
     </div>   
  );
  
}