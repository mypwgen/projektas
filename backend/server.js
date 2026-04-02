const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body || {};

  db.query('SELECT id FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Serverio klaida');
    if (results && results.length) return res.status(400).send('Vartotojas egzistuoja');

    try {
      const hashed = await bcrypt.hash(password, 8);
      db.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, 'user')",
        [username, hashed],
        (err2) => {
          if (err2) return res.status(500).send('Serverio klaida');
          return res.status(201).send('Užregistruota');
        }
      );
    } catch (e) {
      return res.status(500).send('Serverio klaida');
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Prisijungta prie porto 5000`));