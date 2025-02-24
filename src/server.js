const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));