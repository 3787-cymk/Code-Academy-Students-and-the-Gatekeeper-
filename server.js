const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const USERS_FILE = './users.json';

// Signup
app.post('/signup', (req, res) => {
    const { name, password } = req.body;
    let users = JSON.parse(fs.readFileSync(USERS_FILE));

    if (users.find(u => u.name === name)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ name, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ message: 'Signup successful' });
});

// Login
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    let users = JSON.parse(fs.readFileSync(USERS_FILE));

    const user = users.find(u => u.name === name && u.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
});

app.listen(3000, () => console.log('Gatekeeper running on port 3000'));
