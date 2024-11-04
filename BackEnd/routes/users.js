const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
})

router.post('/login', async (req, res) => {
    const {email, number, password, name} = req.body;
    
    if (!email || !number || !password || !name) {
        return res.statut(400).json ("Veillez remplir tous les champs obligatoires !");
    }

    db.query('SELECT * FROM users WHERE email = ?, number = ?', [email], [number], async (err, resultats) => {
        if (err) {
            return res.status(500).json({ err: err.message});
        }
        if (resultats.length > 0) {
            return res.status(400).json({ err: 'L\'utilisateur existe déja.'});
        }

        //Configuration du hashage du password
        // ***

        const query = 'INSERT INTO users (email, number, password, name) VALUE (?, ?, ?, ?)';
         db.query(query, [email, number, password, name], (err, result) => {
            if (err) {
                return res.status(500).json( {error: err.message} );
            }
            res.json({ message: 'Votre compte a été créé avec succes !' })
         });
    });
});

module.exports = Router;
