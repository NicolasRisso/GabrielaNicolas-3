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
                    let message = "Contando os segundos para: ";
                    if (daysUntil > 0) {
                        message += `<span class="timer-number">${daysUntil}</span>dias `;
                    }
                    message += `<span class="timer-number">${hoursUntil}</span>h <span class="timer-number">${minutesUntil}</span>m <span class="timer-number">${secondsUntil}</span>s!`;
                    countdownTimerElement.innerHTML = message;
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
                if (years > 0) timerString += `<span class="timer-number">${years}</span> ano${years > 1 ? 's' : ''}, `;
                if (months > 0 || years > 0) timerString += `<span class="timer-number">${months}</span> mes${months > 1 ? 'es' : ''}, `;
                if (days > 0 || years > 0 || months > 0) timerString += `<span class="timer-number">${days}</span> dia${days > 1 ? 's' : ''} `;

                if (years === 0 && months === 0 && days === 0) {
                    timerString += `algumas horas de namoro `;
                } else {
                     timerString += `de namoro `;
                }
                timerString += `<span class="timer-number">${h}</span>h, <span class="timer-number">${m}</span>m, <span class="timer-number">${s}</span>s`;
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
    // const captionElement = document.getElementById('carousel-caption'); // REMOVED - captions are per-item now
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
            const card = document.createElement('figure'); // Use figure for semantic grouping
            card.classList.add('carousel-img-item');

            const img = document.createElement('img');
            img.src = path;
            img.alt = imageCaptions[i] || `Foto ${i + 1}`;

            const caption = document.createElement('figcaption');
            caption.classList.add('carousel-item-caption-text');
            caption.textContent = imageCaptions[i] || ""; // Ensure caption text is set

            card.appendChild(img);
            card.appendChild(caption);
            filmstripElement.appendChild(card);
        });
    }

    function slideTo(index) {
        if (!filmstripElement || !viewportElement) {
            console.error("Filmstrip or Viewport element not found for slideTo!");
            return;
        }
        const allCards = filmstripElement.querySelectorAll('.carousel-img-item'); // Now these are cards
        if (!allCards.length || index < 0 || index >= allCards.length) {
            console.error(`Invalid index or no cards in filmstrip. Index: ${index}, Count: ${allCards.length}`);
            return;
        }

        const viewportWidth = viewportElement.offsetWidth;
        const cardToCenter = allCards[index];

        const newTransform = (viewportWidth / 2) - (cardToCenter.offsetWidth / 2) - cardToCenter.offsetLeft;

        filmstripElement.style.transform = `translateX(${newTransform}px)`;

        allCards.forEach(card => {
            card.classList.remove('current-img', 'prev-img', 'next-img');
        });

        cardToCenter.classList.add('current-img');

        const prevIndex = (index - 1 + allCards.length) % allCards.length;
        const nextIndex = (index + 1) % allCards.length;

        if (allCards[prevIndex]) {
             allCards[prevIndex].classList.add('prev-img');
        }
        if (allCards[nextIndex]) {
            allCards[nextIndex].classList.add('next-img');
        }

        if (allCards.length === 2 && prevIndex === nextIndex && allCards[prevIndex]) {
            allCards[prevIndex].classList.remove('next-img');
        }
        if (allCards.length === 1 && allCards[0]) {
            allCards[0].classList.remove('prev-img', 'next-img');
        }

        // Removed old caption update logic for #carousel-caption
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

    if (imagePaths.length > 0 && imagePaths.length === imageCaptions.length && filmstripElement && viewportElement) {
        populateFilmstrip();

        const initialTransform = filmstripElement.style.transition;
        filmstripElement.style.transition = 'none';
        slideTo(currentImageIndex);

        filmstripElement.offsetHeight;
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

        window.addEventListener('resize', () => {
            const tempTransition = filmstripElement.style.transition;
            filmstripElement.style.transition = 'none';
            slideTo(currentImageIndex);
            filmstripElement.offsetHeight;
            filmstripElement.style.transition = tempTransition;
        });

    } else {
        console.error("Carousel cannot start: Missing elements, or imagePaths/imageCaptions length mismatch or empty.");
        // if (captionElement) captionElement.textContent = "Erro ao carregar o carrossel."; // Old caption
    }
    // --- Carousel Code END ---
});
