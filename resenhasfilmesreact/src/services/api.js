import axios from 'axios';
// importa o axios da biblioteca  axio criar uma const chamada api e atribuir a ela o axios create que será o inicío e a estrura base do serviço de api que vamos consumir
//baseURL recebendo o endpoint da nossa Api a url que acessa a nossa api
const api = axios.create({
  baseURL: "https://localhost:7129"
})

//exportando a nossa api para que ela possa ser usada em todas as partes do nosso projeto
export default api