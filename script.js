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
                        message += `<span class="timer-number">${daysUntil}</span>dia${daysUntil !== 1 ? 's' : ''}, `;
                    }
                    message += `<span class="timer-number">${hoursUntil}</span>horas, <span class="timer-number">${minutesUntil}</span>minutos e <span class="timer-number">${secondsUntil}</span>segundos!`;
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
                const hourStr = `<span class="timer-number">${h}</span> horas`;
                const minStr = `<span class="timer-number">${m}</span> minutos`;
                const secStr = `<span class="timer-number">${s}</span> segundos`;

                let timerDisplayString =  monthStr + ", " + dayStr + ", " + hourStr + ", " + minStr + " e " + secStr + "!";

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
    let imagePaths = [ // Changed from const to let
        'images/photo1.jpg', 'images/photo2.jpg', 'images/photo3.jpg', 'images/photo4.jpg', 'images/photo5.jpg',
        'images/photo6.jpg', 'images/photo7.jpg', 'images/photo8.jpg', 'images/photo9.jpg', 'images/photo10.jpg',
        'images/photo11.jpg', 'images/photo12.jpg'
    ];

    let imageCaptions = [ // Changed from const to let
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

    let secretImageAdded = false; // Flag for the secret image
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

    function sanitizeTextForMatching(text) {
        if (typeof text !== 'string') return '';
        // Regex for emoji removal (using a range that covers many emojis)
        const emojiRegex = /[-☀-➿]/gu;
        return text.replace(emojiRegex, '')
                   .toLowerCase()
                   .replace(/\s+/g, '');
    }

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

    const secretTextbox = document.getElementById('secret-textbox');
    const messageContainer = document.getElementById('special-message-container'); // Declare messageContainer here for broader scope

    // Helper for emoji strings
    const purpleHeart = String.fromCodePoint(0x1F49C); // 💜
    const yellowHeart = String.fromCodePoint(0x1F49B); // 💛
    const smilingFaceWithHearts = String.fromCodePoint(0x1F970); // 🥰
    const brazilFlag = String.fromCodePoint(0x1F1E7) + String.fromCodePoint(0x1F1F7); // 🇧🇷
    const digitTwoEmoji = "2" + String.fromCharCode(0xFE0F) + String.fromCharCode(0x20E3); // 2️⃣
    const checkMark = String.fromCharCode(0x2705); // ✅

    if (secretTextbox) {
        secretTextbox.addEventListener('focus', () => {
            secretTextbox.classList.remove('focus-yellow', 'focus-purple');
            if (Math.random() < 0.5) {
                secretTextbox.classList.add('focus-yellow');
            } else {
                secretTextbox.classList.add('focus-purple');
            }
        });

        // Optional: Remove class on blur
        // secretTextbox.addEventListener('blur', () => {
        //     secretTextbox.classList.remove('focus-yellow', 'focus-purple');
        // });

        // The 'input' listener's complex logic is removed.
        // It can be left empty or with minimal logic if needed in the future (e.g., char count).
        // For now, we are removing the previous message/carousel processing from it.
        secretTextbox.addEventListener('input', (event) => {
            // Intentionally left largely empty or for basic input handling only.
            // The "Te amo" auto-append to the textbox value is also removed from here.
        });
    }

    const sendSecretCodeButton = document.getElementById('send-secret-code-button');

    // Add keydown listener for 'Enter' key on textarea
    if (secretTextbox && sendSecretCodeButton) {
        secretTextbox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendSecretCodeButton.click();
            }
        });
    }
    
    if (sendSecretCodeButton && secretTextbox && messageContainer) {
        sendSecretCodeButton.addEventListener('click', () => {
            const rawValue = secretTextbox.value;
            const trimmedRawValue = rawValue.trim();
            const sanitizedValue = sanitizeTextForMatching(rawValue);

            // --- Step 1: Carousel Management ---
            // THIS SECTION REMAINS UNCHANGED by this specific subtask
            if (trimmedRawValue === "22" || trimmedRawValue.toLowerCase() === "bolsonaro") {
                if (!secretImageAdded) {
                    if (typeof stopAutoSlide === 'function') stopAutoSlide();
                    if (Array.isArray(imagePaths) && Array.isArray(imageCaptions) && typeof currentImageIndex !== 'undefined') {
                        const bolsonaroCaption =  digitTwoEmoji + digitTwoEmoji + checkMark + "Bolsonaro" + digitTwoEmoji + digitTwoEmoji + checkMark;
                        imagePaths.unshift('images/photo_secret_22.jpg');
                        imageCaptions.unshift(bolsonaroCaption);
                        secretImageAdded = true;
                        currentImageIndex = 0;
                        if (typeof populateFilmstrip === 'function') populateFilmstrip();
                        if (typeof slideTo === 'function' && filmstripElement) {
                            const initialTransform = filmstripElement.style.transition;
                            filmstripElement.style.transition = 'none';
                            slideTo(currentImageIndex);
                            filmstripElement.offsetHeight;
                            filmstripElement.style.transition = initialTransform;
                        }
                        if (typeof startAutoSlide === 'function') startAutoSlide();
                    }
                }
            } else { // Input is NOT "22", so check if secret image should be removed
                if (secretImageAdded) { // Only remove if present
                    const secretImagePath = 'images/photo_secret_22.jpg';
                    const indexToRemove = imagePaths.indexOf(secretImagePath);
                    if (indexToRemove !== -1) { // If the secret image is found
                        if (typeof stopAutoSlide === 'function') stopAutoSlide();

                        imagePaths.splice(indexToRemove, 1);
                        imageCaptions.splice(indexToRemove, 1);
                        secretImageAdded = false; // Reset flag

                        if (typeof populateFilmstrip === 'function') populateFilmstrip();

                        // Adjust currentImageIndex carefully after removal
                        if (imagePaths.length === 0) {
                            currentImageIndex = 0;
                        } else {
                            // Ensure currentImageIndex is within the new bounds
                            if (currentImageIndex >= imagePaths.length) {
                                currentImageIndex = imagePaths.length - 1;
                            }
                            currentImageIndex = Math.max(0, Math.min(currentImageIndex, imagePaths.length - 1));
                        }

                        if (typeof slideTo === 'function' && filmstripElement) {
                            const initialTransform = filmstripElement.style.transition;
                            filmstripElement.style.transition = 'none';
                            slideTo(currentImageIndex);
                            filmstripElement.offsetHeight;
                            filmstripElement.style.transition = initialTransform;
                        }
                        if (typeof startAutoSlide === 'function' && imagePaths.length > 0) {
                            startAutoSlide();
                        }
                    }
                }
            }

            // --- Step 2: Message Processing Logic ---
            // Theme Change Logic
            if (trimmedRawValue.toLowerCase() === "claro") {
                document.body.classList.add('light-theme');
                // Optionally, clear messageForContainer or set a theme-changed message
                // For now, it allows other messages to also appear e.g. "claro te amo"
            } else if (trimmedRawValue.toLowerCase() === "escuro") { // Added condition for "escuro"
                document.body.classList.remove('light-theme');
                // Optional: if (!messageForContainer) messageForContainer = "Tema escuro restaurado!";
            }

            let messageForContainer = '';
            if (sanitizedValue.includes("teamomais")) {
                messageForContainer = "Aaaa não meu amor" + smilingFaceWithHearts + " Eu que te amo muitoo mais" + purpleHeart + yellowHeart;
            } else if (sanitizedValue.includes("teamo")) {
                messageForContainer = "Eu também te amo meu amor" + smilingFaceWithHearts + purpleHeart + yellowHeart;
            } else if (sanitizedValue.includes("meioquedivou") || sanitizedValue.includes("meioquedivamos") || sanitizedValue.includes("meioquedivei")) {
                messageForContainer = "Meio que divamos muitoo né meu amor" + smilingFaceWithHearts;
            } else if (trimmedRawValue === "1905" || trimmedRawValue === "19/05") {
                messageForContainer = purpleHeart + "Feliz Aniversário Gabi, meu Amor" + yellowHeart;
            } else if (trimmedRawValue === "2611" || trimmedRawValue === "26/11") {
                messageForContainer = purpleHeart + "Feliz Aniversário para mim" + smilingFaceWithHearts + yellowHeart;
            }

            // Update Message Container based on messageForContainer or default
            if (messageForContainer) {
                messageContainer.innerHTML = '';
                const messageElement = document.createElement('p');
                messageElement.className = 'special-date-message';

                const randomNumber = Math.random() * 100;
                if (randomNumber < 2) { messageElement.classList.add('message-yellow'); }
                else if (randomNumber < 4) { messageElement.classList.add('message-purple'); }

                messageElement.innerHTML = messageForContainer;
                messageContainer.appendChild(messageElement);
            } else {
                messageContainer.innerHTML = '';
                if (typeof displaySpecialDateMessage === 'function') {
                    displaySpecialDateMessage();
                }
            }

            // Optional: Clear textbox after processing
            secretTextbox.value = "";
        });
    }

    if (sendSecretCodeButton) {
        sendSecretCodeButton.addEventListener('mouseenter', () => {
            // Always remove previous color classes first to reset
            sendSecretCodeButton.classList.remove('hover-yellow', 'hover-purple');

            const randomNumber = Math.random() * 100;
            if (randomNumber < 2) { // 2% chance
                sendSecretCodeButton.classList.add('hover-yellow');
            } else if (randomNumber < 4) { // Next 2% chance
                sendSecretCodeButton.classList.add('hover-purple');
            }
            // If no class is added, the default CSS :hover style will apply
        });

        sendSecretCodeButton.addEventListener('mouseleave', () => {
            // Remove classes on mouse leave to ensure the button is reset for the next hover
            sendSecretCodeButton.classList.remove('hover-yellow', 'hover-purple');
        });
    }
});
