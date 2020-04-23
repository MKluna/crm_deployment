const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'});
/* Cors es importante para que un cliente se conecte y intecambie recursos */
const cors = require('cors');

//Conectar Mongo
mongoose.Promise=global.Promise;
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})



/* Definir dominio(s) para recibir las peticiones */
const whitelist = [process.env.FRONTEND_URL];
const corsOption={
    origin:(origin,callback)=>{
        /* Revisar si la peticion viene de un servidor que esta en la lista blanca */
        const existe = whitelist.some(dominio=>dominio===origin);
        if (existe) {
            callback(null,true)
        }
        else
        {
            callback(new Error('No permitido por CORS'));
        }
    }
}
//Crear el servidor
const app = express();

/* Habilitar Cors */
app.use(cors(corsOption));

const proxyurl = process.env.FRONTEND_URL;
const url = HOST; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


/* Carpeta publica */
app.use(express.static('uploads'));


//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


//Rutas de la app
app.use('/',routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//Iniciar App
app.listen(port,host,()=>{
    console.log('Servidor Funcionando');
    
});