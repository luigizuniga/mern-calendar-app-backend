const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Express server creacion
const app = express();

//Database conexion
dbConnection();

// CORS
app.use(cors());

// Path directorio publico
app.use( express.static('public'));

// Pase y lectura body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/userEvents'));


// PORT escucha 
app.listen( process.env.PORT , () => {
    console.log(`Server running in PORT : ${ process.env.PORT }`);
});