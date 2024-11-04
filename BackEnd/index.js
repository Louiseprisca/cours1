const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
})

db.connect(err => {
    if (err) {
        console.error('Connexion a la base de données ~ Erreur de connexion ~:', err);
    } else {
        console.log('Connexion a la base de données ~ Réussie ~')
    }
});

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});