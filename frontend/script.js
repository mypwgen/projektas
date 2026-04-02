const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    username: form.username.value,
    password: form.password.value
  };

  const res = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  app.post('/add-ad', (req, res) => {
    const { title, category, description, price, role } = req.body;

    // Galim tikrinti role, jeigu reikia (pvz., tik prisijungęs vartotojas)
    if (!role || role !== 'user') {
        return res.status(403).send('Tik prisijungęs vartotojas gali pridėti skelbimą');
    }

    db.query(
        'INSERT INTO ads (title, category, description, price) VALUES (?, ?, ?, ?)',
        [title, category, description, price],
        (err) => {
            if (err) return res.status(400).send('Klaida pridedant skelbimą');
            res.send('Skelbimas sėkmingai pridėtas!');
        }
    );
});

  const text = await res.text();
  alert(text);
});