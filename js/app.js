const gameBoard = document.getElementById('game-board');
const searchInput = document.getElementById('search-input');
const alphabetContainer = document.getElementById('alphabet-filter');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentWords = [];
let displayCount = 50;
const ITEMS_PER_LOAD = 50;

// Sort words alphabetically by foreign word
wordList.sort((a, b) => a.foreign.localeCompare(b.foreign, 'he'));

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

function renderCards(append = false) {
    if (!append) {
        gameBoard.innerHTML = '';
    }

    const itemsToRender = currentWords.slice(
        append ? gameBoard.children.length : 0,
        displayCount
    );

    itemsToRender.forEach(pair => {
        const cardElement = createCard(pair);
        gameBoard.appendChild(cardElement);
    });

    // Handle "Load More" button visibility
    if (displayCount >= currentWords.length) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
}

function renderAlphabetFilter() {
    const alphabet = 'אבגדהוזחטיכלמנסעפצקרשת'.split('');
    const allBtn = document.createElement('button');
    allBtn.className = 'letter-btn active';
    allBtn.textContent = 'הכל';
    allBtn.onclick = () => filterByLetter('ALL', allBtn);
    alphabetContainer.appendChild(allBtn);

    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.onclick = () => filterByLetter(letter, btn);
        alphabetContainer.appendChild(btn);
    });
}

function filterByLetter(letter, btnElement) {
    // Update active state
    document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    if (letter === 'ALL') {
        currentWords = [...wordList]; // Reset to full sorted list
    } else {
        currentWords = wordList.filter(word => word.foreign.startsWith(letter));
    }

    // Reset inputs and render
    searchInput.value = '';
    displayCount = ITEMS_PER_LOAD;
    renderCards(false);
}

function stripNikud(text) {
    return text.replace(/[\u0591-\u05C7]/g, '');
}

function handleSearch(e) {
    const term = stripNikud(e.target.value.toLowerCase());

    // Reset alphabet buttons visual state
    document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));

    if (!term) {
        currentWords = [...wordList];
    } else {
        currentWords = wordList.filter(word =>
            stripNikud(word.foreign).includes(term) || stripNikud(word.hebrew).includes(term)
        );
    }

    displayCount = ITEMS_PER_LOAD;
    renderCards(false);
}

loadMoreBtn.addEventListener('click', () => {
    displayCount += ITEMS_PER_LOAD;
    renderCards(true);
});

searchInput.addEventListener('input', handleSearch);

// Initialize
renderAlphabetFilter();
currentWords = [...wordList]; // Start with all sorted words
renderCards();
