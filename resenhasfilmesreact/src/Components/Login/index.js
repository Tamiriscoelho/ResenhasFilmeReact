import React, {useState} from 'react';
import './style.css';
import '../../StyleGlobal.css';
import loginImage from '../../assets/Login.png';
import api from '../../services/api';
import{Link, useNavigate} from 'react-router-dom';

//Para que esse código  ess componete seja exibido vou alterar o código do App.js 
export default function Login(){
  const [login, setLogin ] = useState(''); // useState para poder armazenar o estado das variveis dad credenciais do usuário. O useState retorna um tupla onde a primera variável retorna o estado atual da variável e setLogin  métodos  ultilizado para atualizar o estado dessa variável
  const [senha, setSenha] = useState('');

  // par poder redirecionar o usuário para a pag autorizada representa o historico de navegação
  const navegacao = useNavigate();

  // A função de login vai ser chamada no formulario <form onSubmit={login}>

  // O valor digitado no  nesse input vai para variavel login  <input type='text' placeholder='Login' value={login} onChange={e=>setLogin(e.target.value)}/>

  async function Mylogin(event) {
    //esse método vai evitar que o form de um refresh assim eu mantenho o comportamento da single pag
      event.preventDefault();

    // definir um objeto  chamdo data encapsular o  login e a senha para submeter a api
    //enviando com json api
      const data = {
         login, senha
      };

      // enviando um request  chamando o método post da api passando a url  e os dados que eu quero passar  estão no meu objeto data
      try {
        const response = await api.post('api/Login/account/loginuser', data)

        //armazenado no localStorage do navegador. Objeto javascript para aramzenar dados no navegador
        localStorage.setItem('login',login);
        localStorage.setItem('token',response.data.token.result);
        localStorage.setItem('roles',response.data.user.roles);
        localStorage.setItem('usuarioModelId', response.data.usuarioModelId);
        navegacao('/filmes');
        
      } catch (error) {
         alert('Login ou Senha inválidos!' + error)
      }
  }
  return(
      <div className='login-container'>
        <section className='form'>
          <img src={loginImage} alt="Login" id='img1'/>
          <form onSubmit={Mylogin}>
            <h1>Login</h1>
            <input type='text' placeholder='Login' value={login}
            onChange={e=>setLogin(e.target.value)}/> 
            <input type='password' placeholder='Senha' value={senha}
            onChange={e=>setSenha(e.target.value)}/>
            <button class='button' type="submit">Login</button>
          </form>
          <Link className='button' to="/filme/novo/usuario">Registre-se</Link>
        </section>

       
      </div>
  )
}