document.addEventListener('DOMContentLoaded', () => {
    // --- Timer Code START ---
    const targetDate = new Date('2025-02-02T16:45:00');
    const countdownTimerElement = document.getElementById('countdown-timer');

    function updateTimer() {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

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
                        message += `<span class="timer-number">${daysUntil}</span>dia${daysUntil !== 1 ? 's' : ''} `;
                    }
                    message += `<span class="timer-number">${hoursUntil}</span>h <span class="timer-number">${minutesUntil}</span>m <span class="timer-number">${secondsUntil}</span>s!`;
                    countdownTimerElement.innerHTML = message;
                } else {
                    countdownTimerElement.innerHTML = "Feliz Dia dos Namorados!";
                }
            }
            return;
        } else {
            const timeSinceTargetMs = now.getTime() - targetDate.getTime();

            const s = Math.floor((timeSinceTargetMs / 1000) % 60);
            const m = Math.floor((timeSinceTargetMs / (1000 * 60)) % 60);
            const h = Math.floor((timeSinceTargetMs / (1000 * 60 * 60)) % 24);

            let years = now.getFullYear() - targetDate.getFullYear();
            let months = now.getMonth() - targetDate.getMonth();
            let days = now.getDate() - targetDate.getDate();

            if (days < 0) {
                months--;
                const daysInLastFullMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += daysInLastFullMonth;
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            if (countdownTimerElement) {
                const monthStr = `<span class="timer-number">${months}</span> mes${months !== 1 ? 'es' : ''}`;
                const dayStr = `<span class="timer-number">${days}</span> dia${days !== 1 ? 's' : ''}`;
                const hourStr = `<span class="timer-number">${h}</span>h`;
                const minStr = `<span class="timer-number">${m}</span>m`;
                const secStr = `<span class="timer-number">${s}</span>s`;

                let timerDisplayString = monthStr + ", " + dayStr + ", " + hourStr + ", " + minStr + " e " + secStr + ".";

                countdownTimerElement.innerHTML = timerDisplayString;
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
        'images/photo6.jpg', 'images/photo7.jpg', 'images/photo8.jpg', 'images/photo9.jpg', 'images/photo10.jpg',
        'images/photo11.jpg', 'images/photo12.jpg'
    ];

    const imageCaptions = [
        "Nosso primeiro date <3", "Ibirapuera e Restaurante Medieval", "Role no Shopping 🥰",
        "Passeio no MASP", "Show das Luzes no Jardim Botânico", "💛Dia que começamos a Namorar💜",
        "Nossa primeira viagem juntos <3", "Mirante de Serra Negra", "TOKYO😶",
        "Restaurante de Jogos", "Candlelight🕯️", "Nosso primeiro prato juntos🥰"
    ];

    const carouselElement = document.getElementById('photo-carousel');
    const viewportElement = document.querySelector('.carousel-viewport');
    const filmstripElement = document.querySelector('.carousel-filmstrip');
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
            const card = document.createElement('figure');
            card.classList.add('carousel-img-item');

            const img = document.createElement('img');
            img.src = path;
            img.alt = imageCaptions[i] || `Foto ${i + 1}`;

            const caption = document.createElement('figcaption');
            caption.classList.add('carousel-item-caption-text');
            caption.textContent = imageCaptions[i] || "";

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
        const allCards = filmstripElement.querySelectorAll('.carousel-img-item');
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
    }
    // --- Carousel Code END ---

    function displaySpecialDateMessage() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // JavaScript months are 0-indexed
        const messageContainer = document.getElementById('special-message-container');

        if (!messageContainer) return;

        let message = '';
        if (month === 6 && day === 12) { // June 12th
            message = '💜Feliz Dia dos Namorados💛';
        } else if (month === 5 && day === 19) { // May 19th
            message = '💜Feliz Aniversário Gabi, meu Amor💛';
        } else if (month === 11 && day === 26) { // November 26th
            message = '💜Feliz Aniversário para mim🥰💛';
        }

        if (message) {
            const messageElement = document.createElement('p');
            messageElement.className = 'special-date-message';
            messageElement.innerHTML = message; // Use innerHTML to render emojis correctly
            messageContainer.appendChild(messageElement);
        }
    }

    displaySpecialDateMessage(); // Call the function to check and display the message on page load
});
