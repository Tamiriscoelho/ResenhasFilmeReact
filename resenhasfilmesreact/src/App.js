//Os componentes react são funções javascript que retornam html aqui nos temos uma mistura de html e javasccript conhecido com jsx javascript xml vá para a function App()
import React from 'react';

import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
//permite usar o css do Bootstrap

import axios from 'axios';//habilita o cliente http baseado em promises para o navegador e node.js que será usado para acessar a api
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'; // permite usar os componentes React stateless para o bootstrap embutidos e para as janelas modais;
import cadastro from'./assets/cadastro.png'; // pegando a imagem da pasta assets

// usando a conexão bidirecional websockte  qualquer alteração feita na function App() a pág vai ser atualizada
function App() {

  const baseUrl = "https://localhost:7129/api/filme"; //edereço para acessar o endpoint

  const [data, setData]=useState([]);//para tratar os dados vindos da api temos que criar um estado vamos usar hooks permite que se use o State e outros recursos do react sem ter que criar uma Class
  //permite criar estados em um componete criado a apartir de uma função. Faz o gerênciamento do estado local do componente e retorna um array com resultados.
  //data - variável que gurada o estado em si
  // setData variável que é uma função que será usada para atualizar o valor do estado ou seja data
  //useState([])- atribui um array vazio como valor inicial.

  const [updateData, setUpdateData]=useState(true);

  const [modalIncluir, setModalIncluir]=useState(false);//indicando que o modal vai estar fechado inicialmente

  const [modalEditar, setModalEditar]=useState(false);

  const [modalExcluir, setModalExcluir]=useState(false);



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

  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir=()=>{
    setModalExcluir(!modalExcluir);
  }

  const selecionarFilme = (filme, opcao) => {
    setFilmeSelecionado(filme);
     (opcao === "Editar") ?
      abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  //cria o método handleChange para guardar os dados do aluno que serão informados nos inputs  setfilmeSeleciona atualiza o estado
  const handleChange = e =>{
    const {name,value} = e.target; // obter os valores do formulario
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
      setUpdateData(true);
      abrirFecharModalIncluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPut=async()=>{
    await axios.put(baseUrl + "/" + filmeSelecionado.filmeModelId, filmeSelecionado)//motando o request usando axios usando o put pasando a urlbase pando o id do filme selecionado e os dados do filme a ser alterdo
    .then(response => {
     var resposta = response.data; // armazendo em resposta a resposta da api
     var dadosAuxiliar=data; //aramazenando os dados em uma variavel auxiliar para fazer as alterações
     dadosAuxiliar.map(filme=>{ // mapeamos os dados
       if(filme.filmeModelId===filmeSelecionado.filmeModelId){ //verificar cada registro que foi alterado e enviar os novos dados para api
         filme.titulo = resposta.titulo;
         filme.genero = resposta.genero;
         filme.ano = resposta.ano;
       }
     });
     setUpdateData(true);
     abrirFecharModalEditar(); // abrir e fechar o modal
    }).catch(error=>{
       console.log(error);
    })
   }

  const pedidoDelete=async()=>{
      await axios.delete(baseUrl+ "/" +filmeSelecionado.filmeModelId)//dando um delete usando axios passando a urlbase e o id do filme selecionado
    .then(response=>{//recebo os dados no response
      setData(data.filter(filme =>filme.filmeModelId !== response.data)); // aplicando um filtro nos dados excluindo os dados que conhecidem com o id que foi retornado da api operador desiguldade estrita verifica o valor e o tipo de dados 
      setUpdateData(true);
      abrirFecharModalExcluir();
    }).catch(error=>{
      console.log(error);
    })
  }

 //useEfect()=>{param1()}[param2]) Permite lidar/ executar efeitos colaterais em componentes funcionais
  //primeiro representa a função o código que se quer executar o segundo é o array de dependecias que indica quando desejamos executar o código vai ser executada depois que rederização estiver disponível na tela
  //será executado após cada rederização
  useEffect(()=>{
    if(updateData) {
      pedidoGet();
      setUpdateData(false);
    }
  },[updateData])

  return (    
    <div  className="filme-container">
      <br/>
      <h3>Cadastro de Filme</h3>
      <header >
        <img src={cadastro} alt='Cadastro'/>
        <button class="btn btn-success" onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Filme</button>
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
                <button className="btn btn-primary" onClick={()=>selecionarFilme(filme, "Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={()=>selecionarFilme(filme, "Excluir")}>Excluir</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Filme</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Título: </label>
            <br/>
            <input type="text" className="form-control" name="titulo" onChange={handleChange} />
            <br/>
            <label>Genero: </label>
            <br/>
            <input type="text" className="form-control" name="genero" onChange={handleChange} />
            <br/>
            <label>Ano: </label>
            <br/>
            <input type="text" className="form-control" name="ano" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button>{"  "}
          <button type="button" class="btn btn-primary" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label> 
            <br/> <input type="text" className="form-control" readOnly value={filmeSelecionado && filmeSelecionado.filmeModelId}/>           
            <br/>
            <label>Título: </label><br/>
            <input type="text" className="form-control" name="titulo" onChange={handleChange}  value={filmeSelecionado && filmeSelecionado.titulo}/><br/>
            <label>Genero: </label><br/>
            <input type="text"  className="form-control" name="genero" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.genero} /><br/>
            <label>Ano: </label><br/>
            <input type="text" className="form-control" 
            name="ano" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.ano}
            /> <br/> 
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>pedidoPut()}>Editar</button>{"  "}
          <button className="btn btn-primary" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão Filme : {filmeSelecionado && filmeSelecionado.titulo} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>pedidoDelete()}>Sim</button>
          <button className="btn btn-secondary" onClick={()=>abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
