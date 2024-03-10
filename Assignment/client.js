const fetch = require('node-fetch-compat');
const usernameInput = document.getElementById('username');
        const gameIdInput = document.getElementById('game-id');
        const createGameButton = document.getElementById('create-game');
        const joinButton = document.getElementById('join-button');
        const gameContainer = document.getElementById('game-container');
        let timerDisplay;
        let socket;
        let gameId;
        let currentRound = 1;
        const totalRounds = 5;
        let timerInterval;
        gameIdInput.disabled = false;
        const chatMessages = document.getElementById('chat-messages');
      const chatForm = document.getElementById('chat-form');
      const messageInput = document.getElementById('message-input');

        createGameButton.addEventListener('click', () => {
            gameId = generateId();
            gameIdInput.value = gameId;
            gameIdInput.disabled = false;
        });

        gameIdInput.addEventListener('input', () => {
            gameIdInput.disabled = false;
            gameId = gameIdInput.value.trim();
            joinButton.disabled = !gameId;
        });

        joinButton.addEventListener('click', () => {
            const username = usernameInput.value;
            if (!username) {
                alert('Please enter a username');
                return;
            }

            if (!gameId) {
                alert('Please generate or enter a Game ID');
                return;
            }

            socket = io();

            socket.on('connect', () => {
                console.log('Connected to the server');
            });

            socket.on('error', (message) => {
                alert(`Error: ${message}`);
                socket.disconnect();
            });

            socket.on('game-start', (data) => {
                const {
                    brand,
                    roomId
                } = data;
                let logoImage = new Image();
                logoImage.src = `data:image/png;base64, ${brand.logo}`;

                gameContainer.innerHTML = `
                <h2>Game Started</h2>
                <h3>Room ID: ${roomId}</h3>
                <h3>Round: <span id="round-counter">${currentRound}/${totalRounds}</span></h3>
                <h3>Guess the logo</h3>
                <img src="${logoImage.src}">
                <input type="text" id="guess">
                <button id="submit-guess">Submit Guess</button>
            `;

                const roundCounter = document.getElementById('round-counter');
                const guessInput = document.getElementById('guess');
                const submitButton = document.getElementById('submit-guess');
                timerDisplay = document.createElement('p');
                gameContainer.appendChild(timerDisplay);

                let timer = 0;
                timerDisplay.textContent = `Time: ${timer} seconds`;

                timerInterval = setInterval(() => {
                    timer++;
                    timerDisplay.textContent = `Time: ${timer} seconds`;
                }, 1000);

                submitButton.addEventListener('click', () => {
                    const guess = guessInput.value.trim();
                    if (!guess) {
                        alert('Please enter a guess');
                        return;
                    }

                    const brandName = brand.name.toLowerCase().trim();
                    const guessedBrand = guess.toLowerCase().trim();

                    if (guessedBrand === brandName) {
                        handleRoundEnd(true);
                    } else {
                        gameContainer.classList.add('incorrect-guess');
                        gameContainer.innerHTML += `<p>Incorrect guess. Keep trying!</p>`;
                        guessInput.value = '';
                        guessInput.focus();
                    }
                });

                guessInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        submitButton.click();
                    }
                });

                guessInput.focus();
                gameContainer.dataset.brand = JSON.stringify(data.brand);
            });

            socket.on('next-round-ready', () => {
                gameContainer.innerHTML += `<p>Waiting for the next round...</p>`;
                currentRound++;
                if (currentRound <= totalRounds) {
                    setTimeout(startNextRound, 5000);
                } else {
                    gameContainer.innerHTML = '<h2>Game Over</h2><p>Thank you for playing!</p>';
                }

                const roundCounter = document.getElementById('round-counter');
                roundCounter.textContent = `${currentRound}/${totalRounds}`;
            });

            socket.on('players-joined', (data) => {
                const {
                    players,
                    roomId
                } = data;
                document.getElementById('room-id').innerText = roomId;

                const playerCountDisplay = document.createElement('p');
                playerCountDisplay.textContent = `Players ${players.length}/2`;
                gameContainer.insertBefore(playerCountDisplay, gameContainer.firstChild);

                const playerList = document.createElement('div');
                players.forEach((player) => {
                    const playerDisplay = document.createElement('p');
                    playerDisplay.textContent = player.username;
                    playerDisplay.dataset.score = player.score;
                    playerList.appendChild(playerDisplay);
                });

                gameContainer.appendChild(playerList);
            });


            socket.on('user-joined', (data) => {
                const {
                    username,
                    roomId
                } = data;
                document.getElementById('room-id').innerText = username;
            });

            socket.emit('join', {
                username,
                gameId
            });
            
            socket.on('chat-message', (data) => {
                displayChatMessage(data.username, data.message);
            });
        });
        
        // Function to display chat messages
      function displayChatMessage(username, message) {
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');
        chatMessage.innerText = `${username}: ${message}`;
        chatMessages.appendChild(chatMessage);
      }

      // Function to display system messages
      function displaySystemMessage(message) {
        const systemMessage = document.createElement('div');
        systemMessage.classList.add('chat-message');
        systemMessage.innerText = message;
        chatMessages.appendChild(systemMessage);
      }

      // Event listener for the chat form submission
      chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message !== '') {
          socket.emit('chat-message', { message });
//          displayChatMessage('You', message);
          messageInput.value = '';
        }
      });

        function handleRoundEnd(correct) {
            const guessInput = document.getElementById('guess');
            const submitButton = document.getElementById('submit-guess');
            submitButton.disabled = true;

            if (correct) {
                gameContainer.classList.add('correct-guess');
                gameContainer.innerHTML += `<p>Your guess is correct!</p>`;
                if (currentRound < totalRounds) {
                    setTimeout(startNextRound, 500);
                } else {
                    gameContainer.innerHTML = '<h2>Game Over</h2><p>Thank you for playing!</p>';
                }

                // Update scores
                const scoresElement = document.getElementById('scores');
                const players = Array.from(document.querySelectorAll('#player-list p'));
                scoresElement.innerHTML = '';
                players.forEach((player) => {
                    const username = player.textContent;
                    const score = parseInt(player.dataset.score) || 0;
                    const scoreElement = document.createElement('p');
                    scoreElement.textContent = `${username}: ${score}`;
                    scoresElement.appendChild(scoreElement);
                });

                // Display winning message
                const winner = players.find((player) => {
                    const score = parseInt(player.dataset.score) || 0;
                    return score === totalRounds;
                });
                if (winner) {
                    gameContainer.innerHTML += `<p>${winner.textContent} wins the game!</p>`;
                }
            } else {
                gameContainer.classList.add('incorrect-guess');
                gameContainer.innerHTML += `<p>Incorrect guess. Keep trying!</p>`;
                guessInput.value = '';
                guessInput.focus();

                setTimeout(() => {
                    gameContainer.classList.remove('incorrect-guess');
                }, 500);

                // Start the next round
                startNextRound();
            }
        }


        function startNextRound() {
  currentRound++;
  const roundCounter = document.getElementById('round-counter');
  roundCounter.textContent = `${currentRound}/${totalRounds}`;

  // Reset timer
  clearInterval(timerInterval);
  let timer = 0;
  timerDisplay.textContent = `Time: ${timer} seconds`;

  const username = "u22502883";
  const password = "Mopane123#";
  const auth = btoa(username + ":" + password);
  
  return fetch('https://wheatley.cs.up.ac.za/u22502883/COS216/HomeworkAssignment/API.php', {
    headers: {
      'Authorization': 'Basic ' + auth,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const brandData = data[0];
        let logoImage = new Image();
        logoImage.src = `data:image/png;base64, ${brandData.logo}`;

        gameContainer.classList.remove('correct-guess', 'incorrect-guess');
        gameContainer.innerHTML = `
          <h2>Game Started</h2>
          <h3>Round: <span id="round-counter">${currentRound}/${totalRounds}</span></h3>
          <h3>Guess the logo</h3>
          <img src="${logoImage.src}">
          <input type="text" id="guess">
          <button id="submit-guess">Submit Guess</button>
        `;

        timerDisplay.textContent = `Time: ${timer} seconds`;
        gameContainer.appendChild(timerDisplay);

        const guessInput = document.getElementById('guess');
        const submitButton = document.getElementById('submit-guess');

        timerInterval = setInterval(() => {
          timer++;
          timerDisplay.textContent = `Time: ${timer} seconds`;
        }, 1000);

        submitButton.addEventListener('click', () => {
          const guess = guessInput.value.trim();
          if (!guess) {
            alert('Please enter a guess');
            return;
          }

          const brandName = brandData.name.toLowerCase().trim();
          const guessedBrand = guess.toLowerCase().trim();

          if (guessedBrand === brandName) {
            handleRoundEnd(true);
          } else {
            gameContainer.classList.add('incorrect-guess');
            gameContainer.innerHTML += `<p>Incorrect guess. Keep trying!</p>`;
            guessInput.value = '';
            guessInput.focus();

            // Remove the shake class after the shake animation ends
            setTimeout(() => {
              gameContainer.classList.remove('incorrect-guess');
            }, 500);
          }
        });

        guessInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            submitButton.click();
          }
        });

        guessInput.focus();
        gameContainer.dataset.brand = JSON.stringify(brandData);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

        function generateId() {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let gameId = '';

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                gameId += characters.charAt(randomIndex);
            }

            return gameId;
        }

        function createGame() {
            gameId = generateId();
            gameIdInput.value = gameId;
            gameIdInput.disabled = false;
            joinButton.disabled = false;
        }

        function joinGame() {
            const username = usernameInput.value;
            if (!username) {
                alert('Please enter a username');
                return;
            }

            if (!gameId) {
                alert('Please generate or enter a Game ID');
                return;
            }

            socket = io();

            socket.on('connect', () => {
                console.log('Connected to the server');
            });

            socket.on('error', (message) => {
                alert(`Error: ${message}`);
                socket.disconnect();
            });

            socket.on('game-start', (data) => {
                const {
                    brand,
                    roomId
                } = data;
                let logoImage = new Image();
                logoImage.src = `data:image/png;base64, ${brand.logo}`;

                gameContainer.innerHTML = `
                <h2>Game Started</h2>
                <h3>Room ID: ${roomId}</h3>
                <h3>Round: <span id="round-counter">${currentRound}/${totalRounds}</span></h3>
                <h3>Guess the logo</h3>
                <img src="${logoImage.src}">
                <input type="text" id="guess">
                <button id="submit-guess">Submit Guess</button>
            `;

                const roundCounter = document.getElementById('round-counter');
                const guessInput = document.getElementById('guess');
                const submitButton = document.getElementById('submit-guess');
                timerDisplay = document.createElement('p');
                gameContainer.appendChild(timerDisplay);

                let timer = 0;
                timerDisplay.textContent = `Time: ${timer} seconds`;

                timerInterval = setInterval(() => {
                    timer++;
                    timerDisplay.textContent = `Time: ${timer} seconds`;
                }, 1000);

                submitButton.addEventListener('click', () => {
                    const guess = guessInput.value.trim();
                    if (!guess) {
                        alert('Please enter a guess');
                        return;
                    }

                    const brandName = brand.name.toLowerCase().trim();
                    const guessedBrand = guess.toLowerCase().trim();

                    if (guessedBrand === brandName) {
                        handleRoundEnd(true);
                    } else {
                        gameContainer.classList.add('incorrect-guess');
                        gameContainer.innerHTML += `<p>Incorrect guess. Keep trying!</p>`;
                        guessInput.value = '';
                        guessInput.focus();
                    }
                });

                guessInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        submitButton.click();
                    }
                });

                guessInput.focus();
                gameContainer.dataset.brand = JSON.stringify(data.brand);
            });

            socket.on('next-round-ready', () => {
                gameContainer.innerHTML += `<p>Waiting for the next round...</p>`;
                currentRound++;
                if (currentRound <= totalRounds) {
                    setTimeout(startNextRound, 5000);
                } else {
                    gameContainer.innerHTML = '<h2>Game Over</h2><p>Thank you for playing!</p>';
                }

                const roundCounter = document.getElementById('round-counter');
                roundCounter.textContent = `${currentRound}/${totalRounds}`;
            });

            socket.on('players-joined', (data) => {
                const {
                    players,
                    roomId
                } = data;
                document.getElementById('room-id').innerText = roomId;

                const playerCountDisplay = document.createElement('p');
                playerCountDisplay.textContent = `Players ${players.length}/2`;
                gameContainer.insertBefore(playerCountDisplay, gameContainer.firstChild);

                const playerList = document.createElement('div');
                players.forEach((player) => {
                    const playerDisplay = document.createElement('p');
                    playerDisplay.textContent = player.username;
                    playerDisplay.dataset.score = player.score;
                    playerList.appendChild(playerDisplay);
                });

                gameContainer.appendChild(playerList);
            });


            socket.on('user-joined', (data) => {
                const {
                    username,
                    roomId
                } = data;
                document.getElementById('room-id').innerText = username;
            });

            socket.emit('join', {
                username,
                gameId
            });
        }