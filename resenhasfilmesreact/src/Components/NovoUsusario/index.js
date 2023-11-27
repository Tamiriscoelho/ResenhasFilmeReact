import React, {useState } from 'react';
import './style.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link,  useNavigate} from 'react-router-dom';
import api from '../../services/api';

export default function NovoUsuario(){

  //é necessario definir um estado para que se possa editar os dados
  const[usuarioModelId, setUsuarioModelId]= useState(null);
  const[nome, setNome]= useState('');
  const[email, setEmail]= useState('');
  const[login, setLogin]= useState('');
  const[senha, setSenha]= useState('');

  const navegacao = useNavigate();

async function saveUser(event){
  event.preventDefault();
    const data ={
      nome,
      email,
      login,
      senha
    }

    try {
      
      await api.post('api/Usuario/CadastroUserComum', data)
      alert(data.nome + 'Salvo com sucesso!')
      
    } catch (error) {
      alert('Erro ao gravar Usuario ' + error)
    }
    navegacao('/');
}

  return(
     <div className='novo-user-container'>
      <div className='content'>
         <section className='form'>
          <FiUserPlus size="105" color='#17202a'/>
          <Link className='back-link' to="/"> 
          <FiCornerDownLeft size="25" color='#17202a'/>
            Retornar
          </Link>
        </section>
        <form onSubmit={saveUser}>
          <input placeholder='Nome'
              onChange = {e => setNome(e.target.value)}
          />
          <input placeholder='Email'
              onChange = {e => setEmail(e.target.value)}
          />
          <input placeholder='Login'
              onChange = {e => setLogin(e.target.value)}
          />
          <input placeholder='Senha'
              onChange = {e => setSenha(e.target.value)}
          />  
          <button className='button' type='submit'>Salvar</button>
        </form>
      </div>
     </div>   
  );
  
}