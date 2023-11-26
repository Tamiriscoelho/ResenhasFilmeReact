//Os componentes react são funções javascript que retornam html aqui nos temos uma mistura de html e javasccript conhecido com jsx javascript xml vá para a function App()
import React from 'react';
import Login from './Components/Login';
import './StyleGlobal.css';

// usando a conexão bidirecional websockte qualquer alteração feita na function App() a pág vai ser atualizada
function App() {
return (<Login/>)

}
export default App;
