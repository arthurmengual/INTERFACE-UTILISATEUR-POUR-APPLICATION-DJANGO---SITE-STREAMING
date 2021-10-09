var url = 'http://localhost:8000/api/v1/titles/';


/***MAIN FILM */
var films_images = {}

async function displayMainFilm(url){
    const response = await fetch(url + '?sort_by=imdb_score');
    const data = await response.json();
    const main_film = document.querySelector('.main');
    main_film.src = data.results[1].image_url;
    main_film.id = data.results[1].id;
}

/****CAROUSSEL PART */

//function to get movie on a single page of the api
async function get_film(genre, page) {
    const response = await fetch(url + genre + '&sort_by=imdb_score' + '&page=' + page);
    const data = await response.json();
    return data.results;
}


//function to fectch films on two pages of the api
async function get_seven_films(genre){
    const films_1 = await get_film(genre, 1);
    const films_2 = await get_film(genre, 2);
    const all_films = await films_1.concat(films_2);
    for (let film of all_films) {
        if (!film.image_url) {all_films.splice(film, 1);}
    }
    films_images[genre] = all_films.slice(0, 7);
    return all_films.slice(0,7);
}


//function to create a caroussel
async function create_caroussel(genre, car_nb) {
    var movies = await get_seven_films(`?genre=${genre}`);
    var div_container = document.getElementById(`caroussel_${car_nb}`)
    var title = document.createElement('h2');
    title.textContent = genre;
    if (genre == '') {title.textContent = 'FILMS LES MIEUX NOTES';}
    div_container.appendChild(title);
    var div_caroussel = document.createElement('div');
    div_caroussel.setAttribute('class', 'caroussel');
    div_caroussel.setAttribute('id', `caroussel ${genre}`);
    div_container.appendChild(div_caroussel);
    var btn_l = document.createElement('a');
    btn_l.setAttribute('class', 'btn_left');
    btn_l.setAttribute('id', `btn_left_${genre}`);
    btn_l.textContent = '<';
    div_caroussel.appendChild(btn_l);
    for (let i = 0; i < 4; i++) {
        var div_item = document.createElement(('div'));
        div_item.setAttribute('class', `item${genre}`);
        div_item.setAttribute('class', 'item');
        div_caroussel.appendChild(div_item);
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('class', 'img');
        var image = document.createElement('img');
        image.setAttribute('class', `img_caroussel${genre}`);
        image.setAttribute('id', movies[i].id);
        image.setAttribute('src', movies[i].image_url);
        div_item.appendChild(a);
        a.appendChild(image);
    }
    var btn_r = document.createElement('a');
    btn_r.setAttribute('class', 'btn_right');
    btn_r.setAttribute('id', `btn_right_${genre}`);

    btn_r.textContent = '>';
    div_caroussel.appendChild(btn_r);
}


//scroll caroussel
var DicoIndex = { Index: 0, IndexAction: 0, IndexComedy: 0, IndexFamily: 0 };


function scroll_forward(genre, index, MoviesSelectors) {
    var movies_data = films_images[`?genre=${genre}`]
    index = index + 1;
    DicoIndex[`Index${genre}`] = index
    for (let i = 0; i < 4; i++){
        MoviesSelectors[i].src = movies_data[(index+i)%7].image_url;
    }
}

function scroll_backward(genre, index, MoviesSelectors) {
    var movies_data = films_images[`?genre=${genre}`]
    index = (index - 1+7)%7;
    DicoIndex[`Index${genre}`] = index
    for (let i = 0; i < 4; i++){
        MoviesSelectors[i].src = movies_data[(index+i)%7].image_url;
    }
}

/******MODALE PART */


//create and display modale
function create_modal(film_id) {
    fetch(url + film_id)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#img_modale').src = data.image_url;
            document.querySelector('#film_infos').innerHTML = `<strong> Title </strong>: &nbsp; &nbsp;  
            ${data.title} <br/> <strong> Genre </strong>: &nbsp; &nbsp; ${data.genres} <br/> <strong> Release date: </strong> &nbsp; &nbsp;
            ${data.date_published} <br/> <strong> Rate: </strong> &nbsp; &nbsp; ${data.rated} <br/> <strong> Score: </strong> &nbsp; &nbsp;
            ${data.metascore} <br/> <strong>D irector: </strong> &nbsp; &nbsp; ${data.directors} <br/> <strong> Actors: </strong> &nbsp; &nbsp;
            ${data.actors} <br/> <strong> Duration: </strong> &nbsp; &nbsp; ${data.duration} <br/> <strong> Country: </strong> &nbsp; &nbsp;
            ${data.countries} <br/> <strong>B ox office: </strong> &nbsp; &nbsp; ${data.reviews_from_users} <br/> <strong> Description: </strong>
            &nbsp; &nbsp; ${data.description}`;
        })
        .then(document.querySelector('#modale_content').style.display = 'flex');
 }



//main film modale
async function main_film(){
    await displayMainFilm(url);
    const main = document.querySelector('.main');
    const id = main.id;
    main.onclick = function () {
        create_modal(id);
    };
}

main_film();


//close btn modale
const close = document.querySelector('#close');
close.onclick = function () {
    document.querySelector('#modale_content').style.display = 'none';
};



/**DISPLAY CAROUSELS */


//Display caroussels and set buttns
async function display_caroussel(genre, car_nb) {
    await create_caroussel(genre, car_nb);
    var btnR = document.getElementById(`btn_right_${genre}`);
    var btnL = document.getElementById(`btn_left_${genre}`);
    var selectors = document.getElementsByClassName(`img_caroussel${genre}`);
    btnR.onclick = function () {
        scroll_forward(genre, DicoIndex[`Index${genre}`], selectors);
    };
    btnL.onclick = function () {
        scroll_backward(genre, DicoIndex[`Index${genre}`], selectors);
    };
    
    const films = document.getElementsByClassName(`img_caroussel${genre}`);
    for (let film of films) {
        film.onclick = function () {
            let id = film.id;
            create_modal(id);
        } ;  
    }
}
    
//display every caroussels
let i = 1;
const genres = ['', 'Action', 'Family', 'Comedy'];
for (let genre of genres){
    display_caroussel(genre, i);
    i++;
}

