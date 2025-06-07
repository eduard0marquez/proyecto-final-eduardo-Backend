//Se crea una constante del archivo server
const Server = require('./models/server');
//se exporta dontenv con el config
require('dotenv').config();
//se crea una constante (objeto )nueva de la funcion server que ya pertenerce al archivo server
const server = new Server();
//se trae su accion.listen de la constante previamente declarada
server.listen();