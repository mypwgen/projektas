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

  const text = await res.text();
  alert(text);
});