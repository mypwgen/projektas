const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM users WHERE username = ?`, [username], async (err, results) => {
        if (err) return res.send('Klaida tikrinant vartotoją');
        if (results.length > 0) return res.send('username jau yra pasirink kita');

        const hashedPassword = await bcrypt.hash(password, 5); // hash slaptazodzio

        db.query(
            `INSERT INTO users (username, password, role) VALUES (?, ?, 'user')`,
            [username, hashedPassword],
            (err) => {
                if (err) return res.send('Klaida registruojantis');
                res.send('Užregistruota sėkmingai!');
            }
        );
    });
});

app.listen(5000, () => console.log('Serveris veikia port 5000'));