const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.send('Įveskite username ir password');
  }

  db.query('SELECT id FROM users WHERE username = ?', [username], async (err, results) => {
    if (results.length > 0) return res.send('Vartotojas egzistuoja');

    const hashed = await bcrypt.hash(password, 8);
    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, 'user')",
      [username, hashed],
      (err2) => {
        if (err2) return res.send('Serverio klaida');
        return res.send('Užregistruota');
      }
    );
  });
});

app.listen(5000, () => console.log('Serveris veikia port 5000'));