var countdownDate = new Date('December 20, 2024 00:00:00').getTime();

function updateCountdown() {
    var now = new Date().getTime();
    var distance = countdownDate - now;
    var countdownElement = document.getElementById('countdown');

    if (!countdownElement) {
        console.error('Elemento con ID "countdown" non trovato nel DOM.');
        clearInterval(countdownInterval);
        return;
    }

    if (distance > 0) {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}g ${hours}h ${minutes}m ${seconds}s`;
    } else {
        countdownElement.textContent = 'Tempo finito!';
        clearInterval(countdownInterval);
    }
}

var countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
