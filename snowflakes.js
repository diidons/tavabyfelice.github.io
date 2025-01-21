// Controlla se la pagina corrente è "eventi.html"
if (window.location.pathname.endsWith('eventi.html')) {
    // Funzione per creare i fiocchi di neve
    function createSnowflakes() {
        const snowflakeCount = 50; // Numero di fiocchi di neve
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = 'cocci'; // Simbolo del fiocco di neve
            snowflake.style.left = Math.random() * 100 + 'vw'; // Posizione orizzontale casuale
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // Durata casuale dell'animazione
            document.body.appendChild(snowflake);

            // Rimuovi il fiocco di neve dopo che è caduto
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }
    }

    // Aggiungi un evento DOMContentLoaded per creare i fiocchi di neve quando la pagina è completamente caricata
    document.addEventListener('DOMContentLoaded', function() {
        createSnowflakes(); // Chiama la funzione per creare i fiocchi di neve


        setTimeout(() => {
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(snowflake => snowflake.remove());
        }, 7000); // 7 sec
    });
}