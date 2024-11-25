document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); //Находит первую форму на странице и сохраняет ее в переменную form

    form.addEventListener("submit", function (event) { //добавляем ивент при отправлении данных
        event.preventDefault(); // Отменяем стандартное поведение отправки формы (те сначала мы проверим наши условия перед отправкой данных на сервер)

        const username = document.getElementById("username").value; //Получаем логин по id username
        const password = document.getElementById("password").value; //аналогично получаем пароль по id password

        // Проверяем логин и пароль
        if (username === "admin" && password === "logadmin") {
            prompt("Добро пожаловать, администратор!");
        } else {
            alert("Неверный логин или пароль");
            
            // Спрашиваем пользователя, желает ли он пройти регистрацию
            const wantsRegistration = prompt("Желаете пройти регистрацию на сайте?");
            
            // Проверяем ответ пользователя
            if (wantsRegistration && wantsRegistration.toLowerCase() === "да") {
                alert("Круто!");
            } else {
                alert("Попробуй ещё раз");
            }
        }
    });
});