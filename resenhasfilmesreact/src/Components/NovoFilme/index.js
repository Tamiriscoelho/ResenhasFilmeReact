import React from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function NovoFilme(){

  const {filmeId} = useParams();

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
        <form>
          <input placeholder='Título'/>
          <input placeholder='Genero'/>
          <input placeholder='Ano'/>
          <button className='button' type='submit'>{filmeId === '0' ? 'Incluir' : 'Editar '}</button>
        </form>
      </div>
     </div>   
  );
  
}