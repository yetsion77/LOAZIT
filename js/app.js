

const gameBoard = document.getElementById('game-board');

function createCard(wordPair) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';

    // Front: Foreign word
    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.textContent = wordPair.foreign;

    // Back: Hebrew alternative
    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.textContent = wordPair.hebrew;

    card.appendChild(front);
    card.appendChild(back);
    cardContainer.appendChild(card);

    cardContainer.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });

    return cardContainer;
}

function initGame() {
    // Shuffle words (optional, but nice)
    // For now we render them in order or shuffled? Let's shuffle every time.
    const shuffledList = [...wordList].sort(() => 0.5 - Math.random());

    shuffledList.forEach(pair => {
        const cardElement = createCard(pair);
        gameBoard.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', initGame);
