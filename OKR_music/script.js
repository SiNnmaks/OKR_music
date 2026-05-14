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

/* ЛАБОРАТОРНА РОБОТА №7: ПОДІЇ ТА ДЕЛЕГУВАННЯ*/

// --- ЗАВДАННЯ 1: Способи призначення обробників (MusicHub версія) ---

// 1.1. Через атрибут HTML (виклик прописаний в onclick="playRandomTrack()")
function playRandomTrack() {
    alert("🎵 Відтворення випадкового треку: 'Acoustic Guitar - Medieval Tavern Theme'.");
}

// 1.2. Через властивість DOM-об'єкта
let btnProp = document.getElementById("btn-prop");
if (btnProp) {
    btnProp.onclick = function() {
        alert("❤️ Акустичний трек успішно додано до вашого плейлиста 'Для сесій D&D'.");
    };
}

// 1.3. Використання addEventListener (декілька обробників на одну подію)
let btnListeners = document.getElementById("btn-listeners");
if (btnListeners) {
    // Перший обробник: технічний лог для розробника
    btnListeners.addEventListener("click", () => {
        console.log("📡 [MusicHub Сервер]: З'єднання встановлено. Буферизація аудіопотоку...");
    });
    // Другий обробник: взаємодія з користувачем
    btnListeners.addEventListener("click", () => {
        alert("🎶 Стрім запущено! Якість звуку: 320 kbps (Hi-Res).");
    });
}

// 1.4. Об'єкт як обробник події (метод handleEvent)
let btnObject = document.getElementById("btn-object");
let btnRemoveObj = document.getElementById("btn-remove-obj");

let audioAnalyzerObj = {
    handleEvent(event) {
        // Виводимо системну інформацію про подію в стилі музичного еквалайзера
        alert(`📊 Аналізатор частот активовано!\nДжерело сигналу (тег): ${event.currentTarget.tagName}\nТип тригера: ${event.type}\nСтатус: Зчитування низьких частот...`);
    }
};

if (btnObject) {
    // Призначаємо об'єкт обробником
    btnObject.addEventListener("click", audioAnalyzerObj);
}

if (btnRemoveObj) {
    btnRemoveObj.addEventListener("click", () => {
        // Видалення об'єкта-обробника
        btnObject.removeEventListener("click", audioAnalyzerObj);
        alert("🔇 Аналізатор спектру вимкнено. Кнопка 'Аналіз спектру' деактивована і більше не реагуватиме на кліки.");
    });
}


// --- ЗАВДАННЯ 2: Спливання, делегування та поведінка ---

// 2.1. Делегування подій: Підсвічування елементів списку
let genresList = document.getElementById("music-genres-list");

if (genresList) {
    // Вішаємо ОДИН обробник на весь список (тег <ul>)
    genresList.onclick = function(event) {
        // Шукаємо найближчий тег <li> від місця кліку
        let li = event.target.closest('li');

        // Якщо клік був не на <li> (або поза нашим списком), ігноруємо
        if (!li || !genresList.contains(li)) return;

        // Знімаємо підсвічування з усіх елементів
        let currentActive = genresList.querySelectorAll('.highlight');
        currentActive.forEach(item => item.classList.remove('highlight'));

        // Додаємо підсвічування (клас) на клікнутий <li>
        li.classList.add('highlight');
    };
}

// 2.2. Делегування подій: Меню кнопок (data-action)
class PlayerMenu {
    constructor(elem) {
        this.elem = elem;
        // Прив'язуємо контекст this до класу, щоб він не загубився при події
        elem.onclick = this.onClick.bind(this);
    }

    play() { alert("▶ Відтворення музики розпочато!"); }
    pause() { alert("⏸ Відтворення призупинено."); }
    stop() { alert("⏹ Музику зупинено."); }

    onClick(event) {
        // Отримуємо дію з атрибута data-action (наприклад, "play")
        let action = event.target.dataset.action;
        if (action) {
            // Викликаємо відповідний метод класу (this.play(), this.pause(), тощо)
            this[action]();
        }
    }
}

let playerMenuDOM = document.getElementById("player-menu");
if (playerMenuDOM) {
    new PlayerMenu(playerMenuDOM); // Ініціалізуємо меню
}

// 2.3. Патерн «Поведінка» (Behavior)
// Додаємо один обробник на весь документ. Він буде шукати елементи з data-play-count.
document.addEventListener('click', function(event) {
    // Перевіряємо, чи має клікнутий елемент атрибут data-play-count
    if (event.target.dataset.playCount !== undefined) {
        // Отримуємо поточне значення, збільшуємо на 1
        let currentCount = parseInt(event.target.dataset.playCount);
        currentCount++;
        
        // Оновлюємо атрибут та текст кнопки
        event.target.dataset.playCount = currentCount;
        event.target.innerHTML = `Слухати пісню (${currentCount})`;
    }
});