const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor() {
        //obtiene los modulos y metodos de express
        this.app = express();
        //se obtiene el puerto que esta en el archivo env
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.rolPath = '/api/rol';
        //this.favoritosPath = 'api/favorito';
        //Conectar con la base de datos que trae la funcion db Connection
        this.conectarBD();

        //Middlewares
        this.middlewares();

        //Funcion para las rutas
        this.routes();
    }
    async conectarBD() {
        //se realiza la conexion por medio de dbconnection que esta en el config de la carpeta database
        await dbConnection();
    }

    middlewares() {
        //CORS se usa para evitar que entren desde cualquier IP
        this.app.use(cors());

        //Leer lo que el usuario envia en el cuerpo de la petición (del FrontEnd)
        this.app.use(express.json());

        //Definir la carpeta publica
    this.app.use(express.static('public'));

    }

    routes() {
    
       this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
        this.app.use(this.productosPath, require('../routes/productos'));
        //this.app.use(this.favoritosPath,require('../routes/favoritos'))
        

    }

    listen() {
        //hace la conexion y levanta el servidor
        this.app.listen(this.port, () => {
            console.log('Servidor en linea en el puerto:', this.port);
        })
    } 
}

module.exports = Server;