//importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');

const configs = require('./config');

require('dotenv').config({ path: 'variables.env'})


/* db.authenticate()
    .then(() => console.log('DB conectada'))
    .catch(error => console.log('error')); */

//configurar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//anadir vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si estamos en produccion o desrrollo
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//Muestar el anio actual y genera la ruta
app.use((req, res,next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;

     /* res.locals.saludo = 'Hola';
    console.log(res.locals); */
    return next();

})

//ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}));

//cargar las rutas
app.use('/', routes());

/*puerto y host para la app*/
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});


