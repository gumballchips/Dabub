const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simple in-memory database (replace with real DB later)
let games = [
    {
        id: 1,
        title: 'Pac-Man',
        description: 'Classic arcade game',
        url: 'https://www.pacman.live/',
        image: 'https://via.placeholder.com/300x200?text=Pac-Man'
    }
];

// Routes
app.get('/api/games', (req, res) => {
    res.json(games);
});

app.post('/api/games', (req, res) => {
    const { title, description, url, image } = req.body;
    
    if (!title || !url) {
        return res.status(400).json({ error: 'Title and URL are required' });
    }

    const newGame = {
        id: Date.now(),
        title,
        description: description || '',
        url,
        image: image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(title)
    };

    games.push(newGame);
    res.status(201).json(newGame);
});

app.delete('/api/games/:id', (req, res) => {
    games = games.filter(g => g.id !== parseInt(req.params.id));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🎮 Game Hub running on http://localhost:${PORT}`);
});