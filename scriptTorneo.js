let players = [];
let currentRound = 1;
let eliminated = [];

// Funzione per mescolare l'array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Textarea auto-adattante
function initAutoResize() {
    const textarea = document.getElementById('participants');
    const resize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    textarea.addEventListener('input', resize);
    resize();
}

function startTournament() {
    const title = document.getElementById("tournamentTitle").value;
    players = document.getElementById("participants").value
        .split('\n')
        .map(p => p.trim())
        .filter(p => p);

    if (players.length < 2) {
        alert('Devi inserire almeno 2 partecipanti');
        return;
    }

    // Mescola l'array dei giocatori
    shuffleArray(players);

    document.getElementById("bracket").innerHTML = `<h2>${title}</h2>`;
    currentRound = 1;
    eliminated = [];
    generateRound();
}

function generateRound() {
    const bracket = document.getElementById("bracket");
    bracket.innerHTML += `<h3>Round ${currentRound}</h3>`;

    const matches = document.createElement('div');
    matches.className = 'matches-container';

    const tempPlayers = [...players];
    const winners = [];

    const numMatches = Math.floor(players.length / 2);
    const hasBye = players.length % 2 !== 0;
    const totalExpectedWinners = numMatches + (hasBye ? 1 : 0);

    while (tempPlayers.length >= 2) {
        const p1 = tempPlayers.shift();
        const p2 = tempPlayers.shift();
        const match = createMatch(p1, p2, winners, totalExpectedWinners);
        matches.appendChild(match);
    }

    if (tempPlayers.length === 1) {
        const byePlayer = tempPlayers[0];
        winners.push(byePlayer);
        const byeElement = document.createElement('div');
        byeElement.textContent = `${byePlayer} avanza al prossimo round.`;
        byeElement.className = 'bye-message';
        matches.appendChild(byeElement);
    }

    bracket.appendChild(matches);
}

function showLoadingIndicator(duration = 500) {
    const bracket = document.getElementById("bracket");
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    bracket.appendChild(loadingDiv);
    setTimeout(() => {
        loadingDiv.remove();
    }, duration);
}

function createMatch(p1, p2, winners, totalExpectedWinners) {
    const container = document.createElement('div');
    container.className = 'match';
    let completed = false;

    const button1 = document.createElement('button');
    button1.textContent = p1;
    
    const button2 = document.createElement('button');
    button2.textContent = p2;
    
    const vsSpan = document.createElement('span');
    vsSpan.textContent = 'VS';
    vsSpan.className = 'vs';

    const handleClick = (winner) => {
        if (completed) return;
        completed = true;

        const loser = winner === p1 ? p2 : p1;
        eliminated.push({ 
            player: loser, 
            round: currentRound 
        });
        
        winners.push(winner);

        button1.disabled = button2.disabled = true;
        button1.style.backgroundColor = winner === p1 ? '#4a90e2' : '#e0e0e0';
        button2.style.backgroundColor = winner === p2 ? '#4a90e2' : '#e0e0e0';

        if (winners.length === totalExpectedWinners) {
            showLoadingIndicator(500);
            setTimeout(() => {
                players = [...winners];
                
                if (players.length === 1) {
                    showFinalResults();
                    return;
                }
                
                currentRound++;
                
                if (players.length % 2 !== 0 && players.length > 1) {
                    players.push(players.pop());
                }
                
                generateRound();
            }, 500);
        }
    };

    button1.addEventListener('click', () => handleClick(p1));
    button2.addEventListener('click', () => handleClick(p2));

    container.append(button1, vsSpan, button2);
    return container;
}

function showFinalResults() {
    const winner = players[0];
    
    if (players.length > 1) {
        eliminated.push({
            player: players[1],
            round: currentRound
        });
    }

    const ranking = eliminated.sort((a, b) => {
        const roundDiff = b.round - a.round;
        return roundDiff !== 0 ? roundDiff : eliminated.indexOf(b) - eliminated.indexOf(a);
    });

    document.getElementById("bracket").innerHTML = `
        <div class="results">
            <h2>🏆 Vincitore: ${winner}</h2>
            <ol>
                <li>${winner} <small>(Campione)</small></li>
                ${ranking.map(p => `
                    <li>${p.player} <small>(Round ${p.round})</small></li>
                `).join('')}
            </ol>
        </div>
    `;
}

// Inizializzazione
initAutoResize();