const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');   


function getRegisterData() {
  return {
    username: registerForm.username.value,    
    password: registerForm.password.value
  };
}

async function sendRegister(data) {
  const res = await fetch('http://localhost:5000/register', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

registerForm.addEventListener('submit', async (e) => {             
  e.preventDefault();
  const data = getRegisterData(); 
  if (!data.username || !data.password) { alert('Įveskite username ir password'); return; }
  try {
    const result = await sendRegister(data);
    alert(result.text);
   
  } catch (err) {
    alert('Klaida registruojantis');
  }
});

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!loginForm.username.value.trim() || !loginForm.password.value) {
      alert('Įveskite username ir password');
      return;
    }
    alert('Jūs prisijungėte');
  });
}