document.getElementById('goToLogin').addEventListener('click', () => {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
});

document.getElementById('goToSignup').addEventListener('click', () => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const result = await response.text();
    alert(result);
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        document.getElementById('login').style.display = '';
        document.getElementById('success').style.display = '';
    } else {
        alert("enter valid username and password");
    }
});
