// Game management
let games = [];

// DOM Elements
const gameGrid = document.getElementById('game-grid');
const addGameBtn = document.getElementById('add-game-btn');
const gameModal = document.getElementById('game-modal');
const playerModal = document.getElementById('player-modal');
const gameForm = document.getElementById('game-form');
const closeButtons = document.querySelectorAll('.close');

// Load games from localStorage or API
function loadGames() {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
        games = JSON.parse(savedGames);
    } else {
        // Default games for demo
        games = [
            {
                id: 1,
                title: 'Pac-Man',
                description: 'Classic arcade game',
                url: 'https://www.pacman.live/',
                image: 'https://via.placeholder.com/300x200?text=Pac-Man'
            }
        ];
    }
    displayGames();
}

// Display all games
function displayGames() {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description || 'No description'}</p>
                <button class="play-btn" onclick="playGame(${game.id})">Play Now</button>
            </div>
        `;
        gameGrid.appendChild(gameCard);
    });
}

// Add new game
function addGame(gameData) {
    const newGame = {
        id: Date.now(),
        ...gameData
    };
    games.push(newGame);
    saveGames();
    displayGames();
}

// Save games to localStorage
function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
}

// Play game in modal
function playGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        document.getElementById('player-title').textContent = game.title;
        document.getElementById('game-frame').src = game.url;
        playerModal.classList.add('active');
    }
}

// Modal controls
addGameBtn.addEventListener('click', () => {
    gameForm.reset();
    gameModal.classList.add('active');
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
        document.getElementById('game-frame').src = '';
    });
});

gameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newGame = {
        title: document.getElementById('game-title').value,
        description: document.getElementById('game-description').value,
        url: document.getElementById('game-url').value,
        image: document.getElementById('game-image').value || 'https://via.placeholder.com/300x200?text=Game'
    };
    addGame(newGame);
    gameModal.classList.remove('active');
    alert('Game added successfully!');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === gameModal) gameModal.classList.remove('active');
    if (e.target === playerModal) playerModal.classList.remove('active');
});

// Initialize
loadGames();