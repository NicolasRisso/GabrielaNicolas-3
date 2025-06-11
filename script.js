document.addEventListener('DOMContentLoaded', () => {
    // --- Timer Code START ---
    const targetDate = new Date('2025-02-02T16:45:00');
    const countdownTimerElement = document.getElementById('countdown-timer');

    function updateTimer() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            const timeUntilStart = difference;
            const daysUntil = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
            const hoursUntil = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesUntil = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
            const secondsUntil = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

            if (countdownTimerElement) {
                if (timeUntilStart > 1000) {
                    countdownTimerElement.innerHTML = `Contando os segundos para: ${daysUntil > 0 ? daysUntil + 'dias ' : ''}${hoursUntil}h ${minutesUntil}m ${secondsUntil}s!`;
                } else {
                    countdownTimerElement.innerHTML = "Feliz Dia dos Namorados!";
                }
            }
            return;
        } else {
            const timeSinceTarget = now - targetDate;
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
                if (days > 0 || years > 0 || months > 0) timerString += `${days} dia${days > 1 ? 's' : ''} `;
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

    if (countdownTimerElement) {
        updateTimer();
        setInterval(updateTimer, 1000);
    }
    // --- Timer Code END ---

    // --- Carousel Code START ---
    const imagePaths = [
        'images/photo1.jpg', 'images/photo2.jpg', 'images/photo3.jpg', 'images/photo4.jpg', 'images/photo5.jpg',
        'images/photo6.jpg', 'images/photo7.jpg', 'images/photo8.jpg', 'images/photo9.jpg', 'images/photo10.jpg'
    ];

    const imageCaptions = [
        "Legenda da Foto 1: Nossos momentos...", "Legenda da Foto 2: Aventuras juntos!", "Legenda da Foto 3: Sorrisos e cumplicidade.",
        "Legenda da Foto 4: Viagem inesquecível.", "Legenda da Foto 5: Celebrando o amor.", "Legenda da Foto 6: Detalhes que encantam.",
        "Legenda da Foto 7: Olhar para o futuro.", "Legenda da Foto 8: Simplesmente feliz.", "Legenda da Foto 9: Colecionando memórias.",
        "Legenda da Foto 10: Para sempre é só o começo."
    ];

    const carouselElement = document.getElementById('photo-carousel');
    const viewportElement = document.querySelector('.carousel-viewport');
    const filmstripElement = document.querySelector('.carousel-filmstrip');
    const captionElement = document.getElementById('carousel-caption');
    const prevButtonElement = document.getElementById('prev-button');
    const nextButtonElement = document.getElementById('next-button');

    let currentImageIndex = 0;
    const autoSlideDelay = 4000;
    let autoSlideIntervalId;

    function populateFilmstrip() {
        if (!filmstripElement) {
            console.error("Filmstrip element not found!");
            return;
        }
        filmstripElement.innerHTML = ''; // Clear existing content
        imagePaths.forEach((path, i) => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = `Foto ${i + 1}`; // Or use imageCaptions[i] for more descriptive alt
            img.classList.add('carousel-img-item');
            if (i === currentImageIndex) {
                // img.id = 'carousel-image'; // ID might not be strictly needed if using classes
                img.classList.add('current-img');
            }
            filmstripElement.appendChild(img);
        });
    }

    function slideTo(index) {
        if (!filmstripElement || !viewportElement) {
            console.error("Filmstrip or Viewport element not found for slideTo!");
            return;
        }

        const itemWidth = viewportElement.offsetWidth;
        const newTransform = -index * itemWidth;
        filmstripElement.style.transform = `translateX(${newTransform}px)`;

        const allImages = filmstripElement.querySelectorAll('.carousel-img-item');
        allImages.forEach(img => {
            img.classList.remove('current-img', 'prev-img', 'next-img');
            // img.removeAttribute('id'); // Remove ID if it was set
        });

        if (allImages[index]) {
            allImages[index].classList.add('current-img');
            // allImages[index].id = 'carousel-image'; // Re-assign ID if needed
        }

        const prevIndex = (index - 1 + imagePaths.length) % imagePaths.length;
        const nextIndex = (index + 1) % imagePaths.length;

        if (allImages[prevIndex]) allImages[prevIndex].classList.add('prev-img');
        if (allImages[nextIndex]) allImages[nextIndex].classList.add('next-img');

        // Handle edge case for 2 images where prev and next are the same
        if (imagePaths.length === 2 && prevIndex === nextIndex && allImages[prevIndex]) {
            allImages[prevIndex].classList.remove('next-img'); // Avoid both prev and next on same image
        }


        if (captionElement && imageCaptions[index]) {
            captionElement.textContent = imageCaptions[index];
        } else if (captionElement) {
            captionElement.textContent = "";
            console.warn(`Caption not found for image index ${index}`);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideIntervalId);
    }

    function nextImage(isManual = false) {
        if (isManual) stopAutoSlide();
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
        slideTo(currentImageIndex);
    }

    function prevImage(isManual = false) {
        if (isManual) stopAutoSlide();
        currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
        slideTo(currentImageIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideIntervalId = setInterval(nextImage, autoSlideDelay);
    }

    // Initialization
    if (imagePaths.length > 0 && imagePaths.length === imageCaptions.length && filmstripElement && viewportElement) {
        populateFilmstrip();
        slideTo(currentImageIndex); // Set initial position and classes

        if (prevButtonElement && nextButtonElement) {
            prevButtonElement.addEventListener('click', () => prevImage(true));
            nextButtonElement.addEventListener('click', () => nextImage(true));
        } else {
            console.error("Navigation buttons not found!");
        }

        if (carouselElement) { // photo-carousel is the main container
            carouselElement.addEventListener('mouseenter', stopAutoSlide);
            carouselElement.addEventListener('mouseleave', startAutoSlide);
        } else {
            console.error("Carousel container element (#photo-carousel) not found!");
        }
        startAutoSlide(); // Start auto-slide after setup
    } else {
        console.error("Carousel cannot start: Missing elements, or imagePaths/imageCaptions length mismatch or empty.");
        if (captionElement) captionElement.textContent = "Erro ao carregar o carrossel.";
    }
    // --- Carousel Code END ---
});
