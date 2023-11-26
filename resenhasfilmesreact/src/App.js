//Os componentes react são funções javascript que retornam html aqui nos temos uma mistura de html e javasccript conhecido com jsx javascript xml vá para a function App()
import React from 'react';
import Routes from './routes';
import './StyleGlobal.css';

// usando a conexão bidirecional websockte qualquer alteração feita na function App() a pág vai ser atualizada
//Usando componete Routes usando o roteamento defido
function App() {
return (<Routes/>)
}
export default App;
