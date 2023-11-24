import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';//permite usar o css do Bootstrap
import axios from 'axios';//habilita o cliente http baseado em promises para o navegador e node.js que será usado para acessar a api
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'; // permite usar os componentes React stateless para o bootstrap embutidos e para as janelas modais;
import cadastro from'./assets/cadastro.png'; // pegando a imagem da pasta assets

function App() {

  const baseUrl = "https://localhost:7129/api/filme"; //edereço para acessar o endpoint

  const [data, setData]=useState([]);//para tratar os dados vindos da api temos que criar um estado vamos usar hooks permite que se use o State e outros recursos do react sem ter que criar uma Class
  //permite criar estados em um componete criado a apartir de uma função. Faz o gerênciamento do estado local do componente e retorna um array com resultados.
  //data - variável que gurada o estado em si
  // setData variável que é uma função que será usada para atualizar o valor do estado ou seja data
  //useState([])- atribui um array vazio como valor inicial.
  const [modalIncluir, setModalIncluir]=useState(false);
   
  //cria o estado filmeselecionado
  const [filmeSelecionado, setFilmeSelecionado]=useState(
  {
      filmeModelId: '',
      titulo: '',
      genero: '',
      ano:''
  })

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  //cria o método handleChange para guardar os dados do aluno que serão informados nos inputs  setfilmeSeleciona atualiza o estado
  const handleChange = e=>{
    const {name,value} = e.target;
    setFilmeSelecionado({
      ...filmeSelecionado,[name]:value
    });
     console.log(filmeSelecionado);
  }

  //criar o request get usando axios e o baseUrl
  //fazer uma chamada usando axios definimos o get passando a baseUrl
  //.then se obter os resultados com sucesso no response vou atualizar o data que representa o estado dos meus dados se tiver um error vai aparecer no console
  const pedidoGet = async()=>{
    await axios.get(baseUrl)//enviar um requisição get para essa url
    .then(response => {//recebo os dados no response
      setData(response.data); // usar o setData e vou atribuir meus dados a variável data
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost=async()=>{
    delete filmeSelecionado.filmeModelId; //deletando o valor do id pois vai ser obtido do bancodados
      await axios.post(baseUrl, filmeSelecionado)//dando um post usando axios passando a urlbase e os dados do filme selecionados la modal
    .then(response=>{//recebo os dados no response
      setData(data.concat(response.data)); // usar o setData e vou atribuir meus dados a variável data
      abrirFecharModalIncluir();
    }).catch(error=>{
      console.log(error);
    })
  }

 //useEfect()=>{param1()}[param2]) Permite lidar/ executar efeitos colaterais em componentes funcionais
  //primeiro representa a função o código que se quer executar o segundo é o array de dependecias que indica quando desejamos executar o código vai ser executada depois que rederização estiver disponível na tela
  //será executado após cada rederização
  useEffect(()=>{
      pedidoGet();
  })

  return (    
    <div className="filme-container">
      <br/>
      <h3>Cadastro de Filme</h3>
      <header >
        <img src={cadastro} alt='Cadastro'/>
        <button  className="btn btn-success" onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Filme</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(filme =>(
            <tr key={filme.filmeModelId}>
              <td>{filme.filmeModelId}</td>
              <td>{filme.titulo}</td>
              <td>{filme.genero}</td>
              <td>{filme.ano}</td>
              <td>
                <button className="btn btn-primary">Editar</button>{" "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>


      <Modal isOpen={modalIncluir}>

        <ModalHeader>Incluir Filmes</ModalHeader>
        <ModalBody>

          <div className='form-group'>

            <label>Título: </label>
            <br/>
            <input type='text' className='form-control' titulo="titulo" onChange={handleChange}/>
            <br/>
            <label>Genero: </label>
            <br/>
            <input type='text' className='form-control' genero="genero" onChange={handleChange}/>
            <br/>
            <label>Ano: </label>
            <br/>
            <input type='text' className='form-control' ano="ano" onChange={handleChange}/>
            <br/>

          </div>

        </ModalBody>

        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()}>Incluir</button>{"  "}
          <button className='btn btn-primary' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>

      </Modal>
    </div>
  );
}
export default App;
