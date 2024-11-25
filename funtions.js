document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM загружен");

    initializeCaptcha();
    initializeSlider();
    initializePurchaseButton();
    initializeLoopList();
    initializeChat();
    reviewsSlider();
    newsSlider();
});

// Инициализация капчи
function initializeCaptcha() {
    const loginButton = document.querySelector(".register-btn");
    const captchaModal = document.getElementById("captchaModal");
    const captchaPrompt = document.getElementById("captchaPrompt");
    const captchaInput = document.getElementById("captchaInput");
    const captchaSubmit = document.getElementById("captchaSubmit");
    const captchaCancel = document.getElementById("captchaCancel");
    const captchaError = document.getElementById("captchaError");

    if (!loginButton || !captchaModal || !captchaPrompt) {
        console.error("Капча: Не найдены необходимые элементы!");
        return;
    }

    let captchaAnswer;

    function generateLetterCaptcha() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let captcha = "";
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaAnswer = captcha;
        return `Введите текст: ${captcha}`;
    }

    function generateNumericCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        captchaAnswer = (num1 + num2).toString();
        return `Решите пример: ${num1} + ${num2}`;
    }

    function showCaptcha() {
        captchaInput.value = "";
        captchaError.style.display = "none";
        captchaPrompt.textContent = generateLetterCaptcha();
        captchaModal.style.display = "flex";
    }

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        showCaptcha();
    });

    captchaSubmit.addEventListener("click", function () {
        if (captchaInput.value === captchaAnswer) {
            captchaModal.style.display = "none";
            window.location.href = "registration.html";
        } else {
            captchaError.style.display = "block";
            captchaPrompt.textContent = generateNumericCaptcha();
        }
    });

    captchaCancel.addEventListener("click", function () {
        captchaModal.style.display = "none";
    });
}

// Инициализация слайдера
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) {
        console.error("Слайды не найдены!");
        return;
    }

    let currentSlide = 0;

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        console.log(`Переключен на слайд: ${currentSlide}`);
    }

    setInterval(changeSlide, 5000);
}

// Инициализация кнопки "Купить"
function initializePurchaseButton() {
    const purchaseButton = document.querySelector(".purchase-btn");
    if (!purchaseButton) {
        console.error("Кнопка 'Купить' не найдена!");
        return;
    }

    purchaseButton.addEventListener("click", function () {
        window.location.href = "buy-cadillac-cts.html";
    });
}

// Инициализация повторяющегося списка
function initializeLoopList() {
    const loopList = document.querySelector(".logos-loop-list");
    if (!loopList) {
        console.error("Список логотипов не найден!");
        return;
    }

    const items = Array.from(loopList.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        loopList.appendChild(clone);
    });
}

// Инициализация чата
function initializeChat() {
    const chatIcon = document.getElementById('chatBotIcon');
    const chatWindow = document.getElementById('chatWindow');

    if (!chatIcon || !chatWindow) {
        console.error("Элементы чата не найдены!");
        return;
    }

    chatIcon.addEventListener("click", function () {
        chatIcon.style.display = 'none';
        chatWindow.style.display = 'flex';
    });

    const closeButton = chatWindow.querySelector('.closeButton');
    closeButton.addEventListener("click", function () {
        chatIcon.style.display = 'block';
        chatWindow.style.display = 'none';
    });
}

function reviewsSlider() {
    const slider = document.querySelector('.reviews-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const reviews = document.querySelectorAll('.review');

    let currentIndex = 0;

    function updateSliderPosition() {
        const slideWidth = reviews[0].offsetWidth + 20; // Учитываем отступы между карточками
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < reviews.length - 1) {
            currentIndex++;
            updateSliderPosition();
        }
    });
}

function newsSlider () {
    const newsSlider = document.querySelector('.news-slider');
    const prevNewsBtn = document.querySelector('.prev-news');
    const nextNewsBtn = document.querySelector('.next-news');
    const newsItems = document.querySelectorAll('.news-item');

    let currentNewsIndex = 0;

    function updateNewsSliderPosition() {
        const slideWidth = newsItems[0].offsetWidth + 20; // Учитываем отступы между карточками
        newsSlider.style.transform = `translateX(-${currentNewsIndex * slideWidth}px)`;
    }

    prevNewsBtn.addEventListener('click', function () {
        if (currentNewsIndex > 0) {
            currentNewsIndex--;
            updateNewsSliderPosition();
        }
    });

    nextNewsBtn.addEventListener('click', function () {
        if (currentNewsIndex < newsItems.length - 1) {
            currentNewsIndex++;
            updateNewsSliderPosition();
        }
    });
} 

document.addEventListener("DOMContentLoaded", function () {
    initializeFilterByBrand();
});

function initializeFilterByBrand() {
    // Находим все кнопки марок авто
    const manufacturerButtons = document.querySelectorAll(".manufacturer_button");
    // Находим все карточки автомобилей
    const carCards = document.querySelectorAll(".card-row");

    // Функция для фильтрации
    function filterCars(brand) {
        carCards.forEach(card => {
            const carBrand = card.getAttribute("data-brand");
            if (carBrand === brand || brand === "Все") {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Добавляем событие клика на каждую кнопку
    manufacturerButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Получаем марку автомобиля из текста кнопки
            const brand = this.querySelector("span").innerText;
            filterCars(brand);
        });
    });
}

