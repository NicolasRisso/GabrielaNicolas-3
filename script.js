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
        filmstripElement.innerHTML = '';
        imagePaths.forEach((path, i) => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = imageCaptions[i] || `Foto ${i + 1}`;
            img.classList.add('carousel-img-item');
            filmstripElement.appendChild(img);
        });
    }

    function slideTo(index) {
        if (!filmstripElement || !viewportElement) {
            console.error("Filmstrip or Viewport element not found for slideTo!");
            return;
        }
        const allImages = filmstripElement.querySelectorAll('.carousel-img-item');
        if (!allImages.length || index < 0 || index >= allImages.length) {
            console.error(`Invalid index or no images in filmstrip. Index: ${index}, Count: ${allImages.length}`);
            return;
        }

        const viewportWidth = viewportElement.offsetWidth;
        const imageToCenter = allImages[index];

        // Calculate the translation needed to center the target image
        // 1. Position of the left edge of the target image relative to the filmstrip: imageToCenter.offsetLeft
        // 2. Desired position of the left edge of the target image, so it's centered in viewport:
        //    (viewportWidth / 2) - (imageToCenter.offsetWidth / 2)
        // 3. TranslateX = Desired Left Position - Current Left Position (relative to filmstrip's current translation)
        const newTransform = (viewportWidth / 2) - (imageToCenter.offsetWidth / 2) - imageToCenter.offsetLeft;

        filmstripElement.style.transform = `translateX(${newTransform}px)`;

        allImages.forEach(img => {
            img.classList.remove('current-img', 'prev-img', 'next-img');
        });

        imageToCenter.classList.add('current-img');

        const prevIndex = (index - 1 + imagePaths.length) % imagePaths.length;
        const nextIndex = (index + 1) % imagePaths.length;

        if (allImages[prevIndex]) {
             allImages[prevIndex].classList.add('prev-img');
        }
        if (allImages[nextIndex]) {
            allImages[nextIndex].classList.add('next-img');
        }

        // Ensure that if prev and next are the same (e.g. 2 images), only one class applies
        if (imagePaths.length === 2 && prevIndex === nextIndex && allImages[prevIndex]) {
            allImages[prevIndex].classList.remove('next-img');
        }
        // If only 1 image, it shouldn't have prev/next classes
        if (imagePaths.length === 1 && allImages[0]) {
            allImages[0].classList.remove('prev-img', 'next-img');
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
        // Call slideTo AFTER images are loaded or use a window.onload or image.onload listener
        // For simplicity now, assuming images have dimensions quickly.
        // A slight delay or ResizeObserver might be needed for robust offsetWidth/offsetLeft reading

        // Initial slide without transition to set start position correctly
        const initialTransform = filmstripElement.style.transition;
        filmstripElement.style.transition = 'none';
        slideTo(currentImageIndex);

        // Force reflow/repaint before re-enabling transition
        filmstripElement.offsetHeight; //offsetHeight read
        filmstripElement.style.transition = initialTransform;


        if (prevButtonElement && nextButtonElement) {
            prevButtonElement.addEventListener('click', () => prevImage(true));
            nextButtonElement.addEventListener('click', () => nextImage(true));
        } else {
            console.error("Navigation buttons not found!");
        }

        if (carouselElement) {
            carouselElement.addEventListener('mouseenter', stopAutoSlide);
            carouselElement.addEventListener('mouseleave', startAutoSlide);
        } else {
            console.error("Carousel container element (#photo-carousel) not found!");
        }
        startAutoSlide();

        // Optional: Recalculate on window resize
        window.addEventListener('resize', () => {
            const tempTransition = filmstripElement.style.transition;
            filmstripElement.style.transition = 'none'; // Disable transition during resize adjustment
            slideTo(currentImageIndex);
            filmstripElement.offsetHeight; // Force reflow
            filmstripElement.style.transition = tempTransition; // Restore transition
        });

    } else {
        console.error("Carousel cannot start: Missing elements, or imagePaths/imageCaptions length mismatch or empty.");
        if (captionElement) captionElement.textContent = "Erro ao carregar o carrossel.";
    }
    // --- Carousel Code END ---
});
