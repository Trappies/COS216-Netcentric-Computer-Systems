const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const { getRandomBrands } = require('./api');
const MIN_PORT = 0;
const MAX_PORT = 49151;
let port = process.argv[2] || null;
const MAX_SCORE = 10;
const gameRooms = {};
let gameInProgress = false;
let currentBrand = null;

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  next();
});

app.use(express.static(__dirname + '/public', { 'extensions': ['html', 'js'] }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

if (!port) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const promptForPort = () => {
    readline.question('Enter the port number to listen on: ', (inputPort) => {
      if (validatePort(inputPort)) {
        port = parseInt(inputPort, 10);
        startServer();
        readline.close();
      } else {
        console.log('Invalid port number. Please enter a valid port within the range 1024 - 49151.');
        promptForPort();
      }
    });
  };

  promptForPort();
} else {
  startServer();
}

function validatePort(inputPort) {
  const parsedPort = parseInt(inputPort, 10);
  return (
    !isNaN(parsedPort) && parsedPort >= MIN_PORT && parsedPort <= MAX_PORT
  );
}

function startServer(){
const server = http.createServer(app);
const io = socketio(server);
const connections = new Map();

io.on('connection', (socket) => {
    let username = null;
    let roomId = null;

    socket.on('join', (data) => {
        username = data.username;

        if (isUsernameTaken(username)) {
            socket.emit('error', 'Username is already taken. Please choose a different username.');
            socket.disconnect();
            return;
        }

        roomId = data.roomId;
        const game = getOrCreateGame(roomId);

        if (game.started) {
            socket.emit('error', 'Game has already started. Cannot join now.');
            socket.disconnect();
            return;
        }

        game.users.push({
            id: socket.id,
            username,
        });

        socket.join(roomId);
        console.log(`User ${username} has joined the game room ${roomId}.`);

        socket.on('chat-message', (data) => {
            const message = data.message.trim();
            if (message !== '') {
                io.to(roomId).emit('chat-message', {
                    username,
                    message
                });
            }
        });

        io.to(roomId).emit('user-joined', username);

        emitPlayersJoined(roomId);

        connections.set(socket.id, username);

        if (game.users.length === 2 && !game.started && !gameInProgress) {
            gameInProgress = true;
            getRandomBrands()
                .then((brands) => {
                    const brand = brands[0];
                    currentBrand = brand;
                    game.brand = brand;

                    io.to(roomId).emit('game-start', {
                        brand,
                    });
                    startGameLoop(game);
                })
                .catch((error) => {
                    console.error('Error getting random brands:', error);
                });
        }
    });
    
socket.on('next-round', () => {
  const game = getGameBySocket(socket);
  if (!game) {
    return;
  }

  const { brand } = game;
  io.to(game.id).emit('next-round', { brand });
});

    socket.on('disconnect', () => {
        disconnectHandler(socket);
        socket.leave(roomId);
    });

    socket.on('guess', (data) => {
        handleGuess(socket, data.guess);
    });

    socket.on('correct-guess', () => {
    const game = getGameBySocket(socket);
    if (!game) {
        return;
    }

    const { users } = game;
    const otherUser = users.find((user) => user.id !== socket.id);

    if (otherUser) {
        io.to(otherUser.id).emit('next-round', { brand: game.brand });
    }
});
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


function emitPlayersJoined(roomId) {
    const game = gameRooms[roomId];
    if (!game) return;

    const players = getPlayersInGame(roomId);
    io.to(roomId).emit('players-joined', {
        players,
        roomId
    });
}

function getPlayersInGame(roomId) {
    const game = gameRooms[roomId];
    if (!game || !game.users) return [];
    return game.users.map((user) => user.username);
}

function isUsernameTaken(username) {
    for (const roomId in gameRooms) {
        const room = gameRooms[roomId];
        if (room.users.some((user) => user.username === username)) {
            return true;
        }
    }
    return false;
}

function getOrCreateGame(roomId) {
    if (gameRooms[roomId]) {
        return gameRooms[roomId];
    }

    const game = {
        id: roomId,
        users: [],
        brand: null,
        scores: {},
        timer: null,
        started: false,
    };

    gameRooms[roomId] = game;
    return game;
}

function disconnectHandler(socket) {
    const game = getGameBySocket(socket);
    if (!game) {
        return;
    }

    const userIndex = game.users.findIndex((user) => user.id === socket.id);
    if (userIndex !== -1) {
        game.users.splice(userIndex, 1);
        if (game.users.length === 1) {
            const winner = game.users[0];
            io.to(winner.id).emit('game-over', {
                winner: winner.username
            });
            delete gameRooms[game.id];
            gameInProgress = false;
        }
    }
}

function startGameLoop(game) {
  if (game.users.length < 2) {
    return;
  }

  const interval = 5000;
  let roundCount = 1;

  const startRound = () => {
    if (roundCount > MAX_SCORE) {
      endGame(game);
      return;
    }

    io.to(game.id).emit('round-start', {
      roundCount,
      brand: currentBrand,
    });

    roundCount++;
  };

  getRandomBrands()
    .then((brands) => {
      const brand = brands[0];
      currentBrand = brand;
      game.brand = brand;

      startRound();

      game.timer = setInterval(startRound, interval);
    })
    .catch((error) => {
      console.error('Error getting random brands:', error);
    });
}

function handleGuess(socket, guess) {
    const game = getGameBySocket(socket);
    if (!game) {
        return;
    }

    const { brand, users, scores } = game;

    if (guess === brand.name.toLowerCase().trim()) {
        scores[socket.id] = (scores[socket.id] || 0) + 1;
        socket.emit('correct');
        io.to(game.id).emit('correct-guess', {
            username: connections.get(socket.id),
            brandName: brand.name
        });

        if (scores[socket.id] >= MAX_SCORE) {
            endRound(game, socket.id);
        } else {

            startNextRound(game);
        }
    } else {
        scores[socket.id] = (scores[socket.id] || 0) + 1;
        socket.emit('wrong', {
            brandName: brand.name
        });
        io.to(game.id).emit('wrong-guess', {
            username: connections.get(socket.id),
            brandName: brand.name
        });

        if (scores[socket.id] >= MAX_SCORE) {
            endRound(game, socket.id);
        }
    }

    displayScore(game);
}

function endRound(game, winnerId) {
    const { users, scores } = game;
    const [user1, user2] = users;
    const winner = users.find((user) => user.id === winnerId);

    io.to(user1.id).emit('round-end', {
        winner: winner.username,
        winnerScore: scores[winnerId],
        opponentScore: scores[user2.id],
        brand: game.brand
    });
    io.to(user2.id).emit('round-end', {
        winner: winner.username,
        winnerScore: scores[winnerId],
        opponentScore: scores[user1.id],
        brand: game.brand
    });

    resetScores(game);

    const nextRoundDelay = 3000;
    setTimeout(() => {
        startNextRound(game);
    }, nextRoundDelay);
}


function startNextRound(game) {
    const { users } = game;
    const [user1, user2] = users;

    getRandomBrands()
        .then((brands) => {
            const brand = brands[0];
            currentBrand = brand;
            game.brand = brand;

            io.to(game.id).emit('next-round', { brand });
            startGameLoop(game); 
        })
        .catch((error) => {
            console.error('Error getting random brands:', error);
        });


    resetScores(game);
}


function resetScores(game) {
    game.scores = {};
}

function displayScore(game) {
    const { users, scores } = game;
    const [user1, user2] = users;

    io.to(user1.id).emit('score', {
        opponent: user2.username,
        score: scores[user1.id] || 0,
        opponentScore: scores[user2.id] || 0
    });

    io.to(user2.id).emit('score', {
        opponent: user1.username,
        score: scores[user2.id] || 0,
        opponentScore: scores[user1.id] || 0
    });
}

function endGame(game) {
    const { users, scores } = game;
    const [user1, user2] = users;

    io.to(user1.id).emit('game-end', {
        winner: getWinner(user1.id, user2.id, scores),
        scores
    });
    io.to(user2.id).emit('game-end', {
        winner: getWinner(user2.id, user1.id, scores),
        scores
    });


     delete gameRooms[game.id];
    gameInProgress = false;
}

function quitHandler(socket) {
    const game = getGameBySocket(socket);
    if (!game) {
        return;
    }

    const { users, timer } = game;
    clearInterval(timer);

    const otherUser = users.find((user) => user.id !== socket.id);
    io.to(otherUser.id).emit('quit');
    delete gameRooms[socket.id];
    delete gameRooms[otherUser.id];
    gameInProgress = false; 
}

function getGameBySocket(socket) {
    const roomId = Object.keys(socket.rooms)[1];
    if (roomId && gameRooms[roomId]) {
        return gameRooms[roomId];
    }
    return null;
}
}

// LIST COMMAND:
//const gameRooms = {};

app.get('/list', (req, res) => {
  const rooms = Object.keys(gameRooms);
  res.json(rooms);
});

// KILL COMMAND:
app.get('/kill/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  if (gameRooms[roomId]) {
    delete gameRooms[roomId];
    res.send(`Room ${roomId} has been killed.`);
  } else {
    res.send(`Room ${roomId} does not exist.`);
  }
});

// QUIT COMMAND:
app.get('/quit/:roomId/:username', (req, res) => {
  const roomId = req.params.roomId;
  const username = req.params.username;
  if (gameRooms[roomId]) {
    const game = gameRooms[roomId];
    const userIndex = game.users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
      game.users.splice(userIndex, 1);
      io.to(roomId).emit('user-left', username);
      res.send(`User ${username} has quit the game.`);
    } else {
      res.send(`User ${username} does not exist in room ${roomId}.`);
    }
  } else {
    res.send(`Room ${roomId} does not exist.`);
  }
});

// GAMES COMMAND:
app.get('/games', (req, res) => {
  const games = Object.keys(gameRooms).map(roomId => {
    const game = gameRooms[roomId];
    return {
      roomId,
      users: game.users.map(user => user.username),
      started: game.started
    };
  });
  res.json(games);
});
