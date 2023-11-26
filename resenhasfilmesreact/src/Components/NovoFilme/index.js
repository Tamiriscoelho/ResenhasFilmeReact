import React from 'react';
import './styles.css';

//Link componete que permite navegar nas páginas da aplicação single page sem dar o refresh
export default function NovoFilme(){
  return(
     <div className='novo-filme-container'>
      <div className='content'>
         <h1>Texto</h1>
         <section className='form'>
        </section>
        <form>
          <input placeholder='Título'/>
          <input placeholder='Genero'/>
          <input placeholder='Ano'/>
          <button className='button' type='submit'>Texto</button>
        </form>
      </div>
     </div>   
  );
  
}