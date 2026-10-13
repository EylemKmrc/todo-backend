const express = require('express'); //importieren von express
const routes = require('./routes');
const mongoose = require('mongoose');   //lädt das mongoose Paket
require('dotenv').config();                      // Lädt die Umgebungsvariablen aus der .env-Datei

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', routes);

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });  //durch process.env wird verbindung zu DB in .env hergestellt
const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.on('open', () => {
    console.log('connected to DB');
});

//starten des Webservers
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});