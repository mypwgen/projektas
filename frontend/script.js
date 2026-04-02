const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');


registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    username: registerForm.username.value.trim(),
    password: registerForm.password.value
  };

  try {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const text = await res.text();
    alert(text);

    if (res.ok && loginForm) {
      registerForm.style.display = 'none';
      loginForm.style.display = '';
      loginForm.username.value = data.username;
    }
  } catch (err) {
    alert('Klaida registruojantis: ' + err.message);
  }
});

// Login handler
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Jūs prisijungėte');
  });
}