(function() {
    'use strict';

    let player1Score;
    let player2Score;

    const winnerMsg = document.querySelector('h1');
    const refreshButton = document.getElementById('refreshButton');
    const player1dice = document.getElementById('player1dice');
    const player2dice = document.getElementById('player2dice');
    
    refreshButton.addEventListener('click', () => {
        player1Score = Math.ceil(Math.random() * 6);
        player2Score = Math.ceil(Math.random() * 6);

        console.log(player1Score);
        console.log(player2Score);

        player1dice.setAttribute('src', `images/dice${player1Score}.png`);
        player2dice.setAttribute('src', `images/dice${player2Score}.png`);

        if(player1Score > player2Score){
            winnerMsg.innerText = '🚩 Player 1 Wins!';
        } else if (player1Score < player2Score){
            winnerMsg.innerText = 'Player 2 Wins! 🚩';
        } else {
            winnerMsg.innerText = 'Draw!';
        }

    });

    setInterval(() => {
        let body = document.querySelector('body');
        body.style.backgroundColor = window.diceApp.utils.getRandomColorString();
    }, 2000);

})();