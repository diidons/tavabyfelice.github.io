document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.slideshow-container .sanremo-img');
    const totalImages = images.length;

    function showNextImage() {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].style.display = 'block';
    }

    setInterval(showNextImage, 8000);
});