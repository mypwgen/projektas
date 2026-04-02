const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');


app.use(express.json());
app.use(cors());


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, "user")', [username, password], (err) => {
        if (err) return res.status(400).send('Klaida registruojantis');
        res.send('Užregistruota');
    });
});


app.listen(5000, () => {
    console.log('Serveris veikia port 5000');
});
