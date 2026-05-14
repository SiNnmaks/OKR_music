/* ЛАБОРАТОРНА РОБОТА №6: JAVASCRIPT */

// 1. Власна функція «Діалог з користувачем» (змінні, умови, цикли)
function userDialog() {
    let continueDialog = true;
    while (continueDialog) {
        let genre = prompt("Який музичний жанр ви любите найбільше?", "Rock");
        if (genre) {
            alert("Клас! " + genre + " — це чудовий вибір.");
        } else {
            alert("Ви нічого не ввели.");
        }
        continueDialog = confirm("Бажаєте повторити діалог?");
    }
}

// 2. Функція виводу інформації про розробника (значення за замовчуванням)
function showDeveloperInfo(lastName, firstName, position = "Студент ІС-42") {
    alert("Розробник: " + lastName + " " + firstName + "\nПосада: " + position);
}

// 3. Функція порівняння двох рядків
function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert("Більший рядок: " + str1);
    } else if (str2.length > str1.length) {
        alert("Більший рядок: " + str2);
    } else {
        alert("Рядки однакової довжини!");
    }
}

// 4. Зміна фону сторінки на 30 секунд (Робота з document та setTimeout)
function changeBackgroundFor30Seconds() {
    let originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#3498db"; 
    alert("Фон змінено на 30 секунд!");
    
    setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
        alert("Фон повернувся до початкового.");
    }, 30000); // 30000 мілісекунд = 30 секунд
}

// 5. Перенаправлення браузера на іншу сторінку (Робота з BOM: location)
function redirectPage() {
    if (confirm("Перейти на сторінку Виконавців?")) {
        location.href = "artists.html";
    }
}

// 6. Робота з DOM-вузлами та їх властивостями
function manipulateDOM() {
    // getElementById та data (nodeValue)
    let note = document.getElementById("special-note");
    if (note) {
        note.firstChild.data = "Дані оновлюються в реальному часі (змінено через data).";
    }

    // querySelectorAll та innerHTML
    let listItems = document.querySelectorAll(".news-list li");
    if (listItems.length > 0) {
        listItems[0].innerHTML = "<strong>Посилання поки недоступні</strong>";
    }

    // outerHTML
    let topAnchor = document.getElementById("top");
    if (topAnchor) {
        topAnchor.outerHTML = "<a id='top' class='updated-anchor'></a>";
    }

    // Створення елементів: createElement та createTextNode
    let newDiv = document.createElement("div");
    newDiv.style.backgroundColor = "#dff9fb";
    newDiv.style.padding = "15px";
    newDiv.style.border = "2px dashed #00a8ff";

    let textNode = document.createTextNode("Насправді ніякий альбом не виходив.");
    
    // Вставка: append
    newDiv.append(textNode);

    // Вставка: prepend (додамо на початок секції новин)
    let newsContainer = document.querySelector(".news-container");
    if (newsContainer) {
        newsContainer.prepend(newDiv);
    }

    // Вставка: after (спочатку додаємо цей текст)
    let afterText = document.createElement("p");
    afterText.textContent = "Адмін вирішив пожартувати";
    newDiv.after(afterText);

    // Використовуємо таймер, щоб зробити паузу перед заміною елемента
    setTimeout(() => {
        // Створюємо елемент для заміни
        let replacement = document.createElement("span");
        replacement.innerHTML = "<em>Перепрошуємо за виниклі незручності</em><br>";
        
        // Вставка: replaceWith (замінюємо попередній параграф на новий span)
        afterText.replaceWith(replacement);
        
        console.log("Елемент успішно замінено через 3 секунди.");
    }, 3000); // 3000 мс = 3 секунди

    // Видалення: remove() (видалимо другий елемент зі списку, якщо він є)
    if (listItems.length > 1) {
        listItems[1].remove(); 
    }
    
    alert("Оновлення Даних з DOM успішно виконано! Перегляньте сторінку.");
}