/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const advRef = document.querySelectorAll('.promo__adv img');
const posterRef = document.querySelector('.promo__bg');
const genreRef = posterRef.querySelector('.promo__genre');
const movieListRef = document.querySelector('.promo__interactive-list');
const addFormRef = document.querySelector('form.add');
const addInputRef = addFormRef.querySelector('.adding__input');
const checkboxRef = addFormRef.querySelector('input[type="checkbox"]');
const bntSubmitRef = document.querySelector('.add button');

addFormRef.addEventListener('submit', (e) => {
    e.preventDefault();

/* let newFilm = `${addInputRef.value[0].toUpperCase()}${addInputRef.value.slice(1)}`; */
    let newFilm = addInputRef.value
    const favorite = checkboxRef.checked

    if (newFilm) {

        if (newFilm.length > 21) {
            newFilm = `${newFilm.slice(0, 21)}...`
        };

        if (favorite) {
            console.log("Добавляем любимый фильм");
        };

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);

        createMovieList(movieDB.movies, movieListRef);
    }

    e.target.reset();
})

function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);

    let movieItem = films.map((item, i) => {
        return `<li class="promo__interactive-item">${i + 1} ${item}
                    <div class="delete"></div>
                </li>`
    });

    parent.insertAdjacentHTML('afterbegin', movieItem.join(''));

    /* films.forEach((film, i) => {
        parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>`
    }) */

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            createMovieList(movieDB.movies, movieListRef);
        });
    });
};

function deleteAdv(array) {
    array.forEach(item => item.remove())
};

function makeChenges() {
    genreRef.textContent = 'драма';
    posterRef.style.backgroundImage = 'url("img/bg.jpg")';
}

function sortArr(array) {
    array.sort();
};

deleteAdv(advRef);
makeChenges();
createMovieList(movieDB.movies, movieListRef);