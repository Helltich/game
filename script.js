const dealButton = document.getElementById('deal-button');

const playerCardsDiv = document.getElementById('player-cards');

const bankerCardsDiv = document.getElementById('banker-cards');

const playerScoreDiv = document.getElementById('player-score');

const bankerScoreDiv = document.getElementById('banker-score');

const resultDiv = document.getElementById('result');

const betResultDiv = document.getElementById('bet-result');

const currentBetDisplay = document.getElementById('current-bet');

const historyDiv = document.getElementById('history');


let playerBet = 0;

let bankerBet = 0;

let tieBet = 0;


function getRandomCard() {

    return Math.floor(Math.random() * 10); // Menghasilkan angka antara 0-9

}


function calculateScore(cards) {

    let score = cards.reduce((a, b) => a + b, 0) % 10; // Menghitung total dan ambil sisa bagi 10

    return score;

}


async function revealCards(cardsDiv, cards, isPlayer) {

    for (const card of cards) {

        const cardDiv = document.createElement('div');

        cardDiv.className = 'card ' + (isPlayer ? 'player-card' : 'banker-card'); // Menambahkan kelas sesuai

        cardDiv.innerText = card; // Menampilkan nilai kartu

        cardsDiv.appendChild(cardDiv);

        await new Promise(resolve => setTimeout(resolve, 1000)); // Tunggu 1 detik sebelum membuka kartu berikutnya

    }

}


async function dealCards() {

    playerCardsDiv.innerHTML = '';

    bankerCardsDiv.innerHTML = '';

    resultDiv.innerHTML = '';

    betResultDiv.innerHTML = '';


    const playerCards = [getRandomCard(), getRandomCard()];

    const bankerCards = [getRandomCard(), getRandomCard()];


    // Reveal player cards

    await revealCards(playerCardsDiv, playerCards, true);

    // Reveal banker cards

    await revealCards(bankerCardsDiv, bankerCards, false);


    const playerScore = calculateScore(playerCards);

    const bankerScore = calculateScore(bankerCards);


    playerScoreDiv.innerText = `Score: ${playerScore}`;

    bankerScoreDiv.innerText = `Score: ${bankerScore}`;


    let resultMessage = '';

    if (playerScore > bankerScore) {

        resultMessage = "Pemain Menang!";

        if (playerBet > 0) {

            betResultDiv.innerText = `Anda menang Rp ${playerBet * 2}!`;

        }

        addToHistory("Pemain Menang");

    } else if (bankerScore > playerScore) {

        resultMessage = "Bankir Menang!";

        if (bankerBet > 0) {

            betResultDiv.innerText = `Anda menang Rp ${bankerBet * 2}!`;

        }

        addToHistory("Bankir Menang");

    } else {

        resultMessage = "Seri!";

        if (tieBet > 0) {

            betResultDiv.innerText = `Anda menang Rp ${tieBet * 8}!`;

        }

        addToHistory("Seri");

    }


    resultDiv.innerText = resultMessage;


    // Reset taruhan setelah setiap putaran

    playerBet = 0;

    bankerBet = 0;

    tieBet = 0;

    currentBetDisplay.innerText = 'Rp 0'; // Reset tampilan taruhan

}


function addToHistory(result) {

    const listItem = document.createElement('li');

    listItem.innerText = result;

    historyDiv.appendChild(listItem);

}


// Event listeners untuk tombol taruhan

document.getElementById('increase-bet').addEventListener('click', () => {

    playerBet += 10000; // Menambah taruhan sebesar Rp 10.000

    currentBetDisplay.innerText = `Rp ${playerBet}`; // Update tampilan taruhan

});


document.getElementById('decrease-bet').addEventListener('click', () => {

    if (playerBet >= 10000) {

        playerBet -= 10000; // Mengurangi taruhan sebesar Rp 10.000

    } else {

        playerBet = 0; // Tidak bisa kurang dari 0

    }

    currentBetDisplay.innerText = `Rp ${playerBet}`; // Update tampilan taruhan

});


// Event listeners untuk tombol taruhan Rp 2.000 dan Rp 5.000

document.getElementById('bet-2000').addEventListener('click', () => {

    playerBet = 2000; // Set taruhan menjadi Rp 2.000

    currentBetDisplay.innerText = `Rp ${playerBet}`; // Update tampilan taruhan

});

document.getElementById('bet-5000').addEventListener('click', () => {
    playerBet = 5000; // Set taruhan menjadi Rp 5.000
    currentBetDisplay.innerText = `Rp ${playerBet}`; // Update tampilan taruhan
});

// Event listeners untuk taruhan
document.getElementById('bet-player').addEventListener('click', () => {
    if (playerBet > 0) {
        alert(`Anda telah bertaruh Rp ${playerBet} pada Pemain.`);
    } else {
        alert("Silakan tentukan jumlah taruhan terlebih dahulu.");
    }
});

document.getElementById('bet-banker').addEventListener('click', () => {
    bankerBet = playerBet; // Menggunakan taruhan pemain untuk bankir
    if (bankerBet > 0) {
        alert(`Anda telah bertaruh Rp ${bankerBet} pada Bankir.`);
    } else {
        alert("Silakan tentukan jumlah taruhan terlebih dahulu.");
    }
});

document.getElementById('bet-tie').addEventListener('click', () => {
    tieBet = playerBet; // Menggunakan taruhan pemain untuk seri
    if (tieBet > 0) {
        alert(`Anda telah bertaruh Rp ${tieBet} pada Seri.`);
    } else {
        alert("Silakan tentukan jumlah taruhan terlebih dahulu.");
    }
});

// Event listener untuk tombol Deal
dealButton.addEventListener('click', dealCards);