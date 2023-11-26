import React from 'react';
import './style.css';
import '../../StyleGlobal.css';
import loginImage from '../../assets/Login.png';

//Para que esse código  ess componete seja exibido vou alterar o código do App.js 
export default function Login(){
  return(
      <div className='login-container'>
        <section className='form'>
          <img src={loginImage} alt="Login" id='img1'/>
          <form>
            <h1>Login</h1>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <button class='button' type="submit">Login</button>
          </form>
        </section>
      </div>
  )
}