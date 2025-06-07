const mongoose = require('mongoose');

//Se dechara con una funcion asincrona para que se ejecute en segundo plano 
const dbConnection = async () => {
    //Dentro de try se agrega que se ejecutara , en este caso la coneccion a la base
    try {
        // Dado que es una funcion asinconra se agrega el await para que espere a que genere una respuesta y continue su ejecucion
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos en linea')
    }
    //En caso que no se ejecute mandara un error con el error y un mensaje
    catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }
}

//se exporta para que este disponible para todo el proyecto
module.exports = {
    dbConnection,
}