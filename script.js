document.addEventListener('DOMContentLoaded', () => {
    // --- Timer Code START ---
    const targetDate = new Date('2025-02-02T16:45:00');
    const countdownTimerElement = document.getElementById('countdown-timer');

    function updateTimer() {
        const now = new Date();
        const difference = targetDate - now; // Corrected: targetDate - now for countdown

        if (difference > 0) { // If targetDate is in the future
            const timeUntilStart = difference; // difference is already targetDate - now
            const daysUntil = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
            const hoursUntil = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesUntil = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
            const secondsUntil = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

            if (countdownTimerElement) {
                if (timeUntilStart > 1000) { // Check if more than 1 second remaining
                    countdownTimerElement.innerHTML = `Contando os segundos para: ${daysUntil > 0 ? daysUntil + 'dias ' : ''}${hoursUntil}h ${minutesUntil}m ${secondsUntil}s!`;
                } else {
                    // This will briefly show when the time is up, before the main counter starts
                    countdownTimerElement.innerHTML = "Feliz Dia dos Namorados!"; // Or a similar message
                }
            }
            return; // Return to avoid running the count-up logic
        } else { // If targetDate is in the past or now, start count-up
            const timeSinceTarget = now - targetDate; // difference for count-up

            let totalDays = Math.floor(timeSinceTarget / (1000 * 60 * 60 * 24));
            let years = Math.floor(totalDays / 365.25);
            let remainingDaysForMonths = Math.floor(totalDays % 365.25);
            let months = Math.floor(remainingDaysForMonths / 30.44);
            let days = Math.floor(remainingDaysForMonths % 30.44);

            const h = Math.floor((timeSinceTarget % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((timeSinceTarget % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((timeSinceTarget % (1000 * 60)) / 1000);

            if (countdownTimerElement) {
                let timerString = `Feliz `;
                if (years > 0) timerString += `${years} ano${years > 1 ? 's' : ''}, `;
                if (months > 0 || years > 0) timerString += `${months} mes${months > 1 ? 'es' : ''}, `;
                // Show 'days' only if there are years or months, or if it's the largest unit
                if (days > 0 || years > 0 || months > 0) timerString += `${days} dia${days > 1 ? 's' : ''} `;

                // If all are zero (e.g. first few seconds), provide a default part of the message
                if (years === 0 && months === 0 && days === 0) {
                    timerString += `algumas horas de namoro `;
                } else {
                     timerString += `de namoro `;
                }
                timerString += `${h}h, ${m}m, ${s}s`;
                countdownTimerElement.innerHTML = timerString;
            }
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
    // --- Timer Code END ---

    // --- Carousel Code START ---
    const imagePaths = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/photo7.jpg',
        'images/photo8.jpg',
        'images/photo9.jpg',
        'images/photo10.jpg'
    ];

    const carouselImageElement = document.getElementById('carousel-image');
    const prevButtonElement = document.getElementById('prev-button');
    const nextButtonElement = document.getElementById('next-button');

    let currentImageIndex = 0;

    function showImage(index) {
        if (!carouselImageElement) {
            console.error("Carousel image element not found!");
            return;
        }
        carouselImageElement.src = imagePaths[index];
        carouselImageElement.alt = `Foto ${index + 1}`;
    }

    function nextImage() {
        currentImageIndex++;
        if (currentImageIndex >= imagePaths.length) {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = imagePaths.length - 1;
        }
        showImage(currentImageIndex);
    }

    if (prevButtonElement && nextButtonElement) {
        prevButtonElement.addEventListener('click', prevImage);
        nextButtonElement.addEventListener('click', nextImage);
    } else {
        console.error("Navigation buttons not found!");
    }

    if (imagePaths.length > 0 && carouselImageElement) {
        showImage(currentImageIndex);
    } else if (carouselImageElement) {
        carouselImageElement.alt = "Nenhuma imagem para exibir.";
    }
    // --- Carousel Code END ---
});
