url = 'http://localhost:8000/api/v1/titles/'


/***MAIN FILM */


async function displayMainFilm(url){
    const response = await fetch(url);
    const data = await response.json();
    const main_film = document.querySelector('.main');
    main_film.src = data.results[0].image_url;
    main_film.id = data.results[0].id;
}

displayMainFilm(url)

/****CAROUSSEL PART */


//function to get movie on a single page of the api
async function get_film(filtre, page) {
    const response = await fetch(url + filtre + '&page=' + page);
    const data = await response.json();
    return data.results
}

//function to fectch films on two pages of the api
let caroussel_tags = document.querySelectorAll('.img_film');

async function get_ten_films(filtre){
    const films_1 = await get_film(filtre, 1)
    const films_2 = await get_film(filtre, 2)
    const all_films = await films_1.concat(films_2)
    return all_films
}


//function to display films images et infos in the caroussel, also stores the film id
let k = -1;
let j = 0;

async function display_films_imgs(filtre, balises) {
    const films = await get_ten_films(filtre);
    for (let balise of balises) {
        k = (k + 1) % 7;
        balise.src = films[k].image_url;
        balise.id = films[k].id;
    }
    k = j;
    j = (j+1)%7;
}
         

//1st caroussel
const BalisesCaroussel1 = document.querySelectorAll('.img_caroussel1');
display_films_imgs('?sort_by=imdb_score', BalisesCaroussel1);

//2nd Caroussel
const BalisesCaroussel2 = document.querySelectorAll('.img_caroussel2');
display_films_imgs('?genre=Action', BalisesCaroussel2);

//3rd caroussel
const BalisesCaroussel3 = document.querySelectorAll('.img_caroussel3');
display_films_imgs('?genre=Family', BalisesCaroussel3);

//4th caroussel
const BalisesCaroussel4 = document.querySelectorAll('.img_caroussel4');
display_films_imgs('?genre=Comedy', BalisesCaroussel4);


//buttons
const btn_right = document.querySelector('#btn_right1');
const btn_left = document.querySelector('#btn_left1');

btn_right.onclick = function () {
    display_films_imgs('&genre=Action');
}

btn_left.onclick = function () {
    display_films_imgs('&genre=Action')
}


/******MODALE PART */


//create and display modale
function create_modal(film_id) {
    fetch(url + film_id)
        .then(res => res.json())
        .then(data => {
            const title = data.title;
            const genre = data.genres;
            const image = data.image_url;
            const release_date = data.date_published;
            const rate = data.rated;
            const score = data.metascore;
            const director = data.directors;
            const actors = data.actors;
            const time = data.duration;
            const country = data.countries;
            const box_office = data.reviews_from_users;
            const resumen = data.description;
            document.querySelector('#img_modale').src = image;
            document.querySelector('#film_infos').innerHTML = 'Title: ' + title +
                '<br/>' + 'Genre: ' + genre + '<br/>' + 'Release data: ' + release_date +
                '<br/>' + 'Rate: ' + rate + '<br/>' + 'Score: ' + score + '<br/>' +
                'Director: ' + director + '<br/>' + 'Actors: ' + actors +
                '<br/>' + 'Duration: ' + time + '<br/>' + 'Country: ' + country + '<br/>' +
                'Box office: ' + box_office + '<br/>' + 'Description: ' + resumen;
        })
        .then(document.querySelector('#modale_content').style.display = 'flex')
 }


//caroussel
const films1 = document.getElementsByClassName('img_caroussel1');
const films2 = document.getElementsByClassName('img_caroussel2');
const films3 = document.getElementsByClassName('img_caroussel3');
const films4 = document.getElementsByClassName('img_caroussel4');
const films = [...films1, ...films2, ...films3, ...films4];
for (let film of films) {
    film.onclick = function () {
        let id = film.id
        create_modal(id);
    }
}


//main film
const main_film = document.querySelector('.main');
const id = main_film.id;
main_film.onclick = function () {
    create_modal(id);
}


//close modale
const close = document.querySelector('#close');
close.onclick = function () {
    document.querySelector('#modale_content').style.display = 'none'
}

