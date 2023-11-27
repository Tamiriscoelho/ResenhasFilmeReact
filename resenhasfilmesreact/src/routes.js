//arquivo para definir as rotas  após  instalar o pacote npm i react-router-dom   
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login";
import Filmes from "./Components/Filmes";
import NovoFilme from "./Components/NovoFilme";

//definido o componente de rotas
export default function MyRoutes() {
  return(
    //BrowserRouter usado para definir todas as rotas o 
    //dentro do  <Routes> a rota é localizada e quando é encontrada o processo é finalizado
    //Route para definir a rota adicionamos um path ou seja um caminho com a rota raiz.
    //Compononte route pra fazer a renderização da inteface componente ou uma pagina quando o caminho especifico for encontrado ele vai renderizar passando exact para que seja rederizado a rota especifica pasando o componente.
    //vá para o arquivo App.js
      <Router>
        <Routes>
          <Route path="/" exact  element={<Login/>}/>
          <Route path="/filmes" element={<Filmes/>}/>
          <Route path="/filme/novo/:filmeId" element={<NovoFilme/>}/>
        </Routes>
      </Router>  
  );
}