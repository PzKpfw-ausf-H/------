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
    const chatIcon = document.getElementById('chatBotIcon'); // Получаем элемент с ID "chatBotIcon"
    const chatWindow = document.getElementById('chatWindow'); // Получаем элемент с ID "chatWindow"
    const chatContent = document.getElementById('chatContent'); // Получаем элемент с ID "chatContent"
    const chatInput = document.getElementById('textInfo'); // Получаем элемент с ID "textInfo"
    const sendButton = document.querySelector('.sendButton'); // Получаем первый соответсвующий "sendbutton"
    const closeButton = chatWindow.querySelector('.closeButton'); // Получаем первый соответсвующий "closebutton"

    if (!chatIcon || !chatWindow || !chatContent || !chatInput || !sendButton) {
        console.error("Элементы чата не найдены!");     //обработчик ошибок.
                                                        //Если не найден элемент на странице - выдаст сообщение в консоли "Элементы чата не найдены!"
        return;
    }

    // Открыть окно чата
    chatIcon.addEventListener("click", function () {
        chatIcon.style.display = 'none';
        chatWindow.style.display = 'flex';
    });

    // Закрыть окно чата
    closeButton.addEventListener("click", function () {
        chatIcon.style.display = 'block';
        chatWindow.style.display = 'none';
    });

    // Отправка сообщения
    sendButton.addEventListener("click", function () {
        const message = chatInput.value.trim();
        if (message === "") {
            alert("Введите сообщение перед отправкой."); //Если ввод пустой - выдаст предупреждение на страничке о том, что необходимо ввести сообщение
            return;
        }

        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = message;
        chatContent.appendChild(userMessage);

        // Очистить поле ввода
        chatInput.value = "";

        // Ответ менеджера (симуляция)
        setTimeout(() => {
            const managerMessage = document.createElement("div");
            managerMessage.classList.add("manager-message");
            managerMessage.textContent = "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.";
            chatContent.appendChild(managerMessage);

            // Автопрокрутка вниз
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 1000);
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

    // Храним выбранные марки в Set (для исключения дублирования)
    const selectedBrands = new Set();

    // Функция для фильтрации
    function filterCars() {
        carCards.forEach(card => {
            const carBrand = card.getAttribute("data-brand");
            // Показываем карточку, если она соответствует одной из выбранных марок
            if (selectedBrands.has(carBrand) || selectedBrands.size === 0) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Добавляем событие клика на каждую кнопку
    manufacturerButtons.forEach(button => {
        button.addEventListener("click", function () {
            const brand = this.querySelector("span").innerText;

            // Если марка уже выбрана, убираем её из списка
            if (selectedBrands.has(brand)) {
                selectedBrands.delete(brand);
                this.classList.remove("selected"); // Убираем подсветку кнопки
            } else {
                selectedBrands.add(brand);
                this.classList.add("selected"); // Подсвечиваем кнопку
            }

            // Применяем фильтр
            filterCars();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.querySelector(".filter-form");
    const carCards = document.querySelectorAll(".card-row");

    filterForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        // Получаем значения из полей формы
        const engineVolume = parseFloat(document.getElementById("engine-volume").value) || null;
        const releaseYear = parseInt(document.getElementById("release-year").value) || null;
        const maxPrice = parseInt(document.getElementById("max-price").value) || null;

        // Фильтрация карточек
        carCards.forEach((card) => {
            // Используем data-атрибуты из HTML
            const carEngine = parseFloat(card.dataset.engine) || 0;
            const carYear = parseInt(card.dataset.year) || 0;
            const carPrice = parseInt(card.dataset.price) || 0;

            // Условие для фильтрации (проверяем только введенные параметры)
            const matchesEngine = engineVolume === null || carEngine >= engineVolume;
            const matchesYear = releaseYear === null || carYear >= releaseYear;
            const matchesPrice = maxPrice === null || carPrice <= maxPrice;

            // Отображаем карточку, если она соответствует всем введенным критериям
            if (matchesEngine && matchesYear && matchesPrice) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


