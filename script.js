url = 'http://localhost:8000/api/v1/titles/'


/***MAIN FILM */


async function displayMainFilm(url){
    const response = await fetch(url);
    const data = await response.json();
    const main_film = document.querySelector('.main');
    main_film.src = data.results[0].image_url;
    main_film.id = data.results[0].id;
}

/****CAROUSSEL PART */

//function to get movie on a single page of the api
async function get_film(filtre, page) {
    const response = await fetch(url + filtre + '&page=' + page);
    const data = await response.json();
    return data.results
}


//function to fectch films on two pages of the api
async function get_seven_films(filtre){
    const films_1 = await get_film(filtre, 1);
    const films_2 = await get_film(filtre, 2);
    const all_films = await films_1.concat(films_2);
    for (let film of all_films) {
        if (!film.image_url) {all_films.splice(film, 1)}
    }
    return all_films.slice(0,7)
}


//function to create a caroussel
async function create_caroussel(genre) {
    movies = await get_seven_films(`?genre=${genre}`);
    var div_container = document.createElement('container');
    document.body.appendChild(div_container);
    var title = document.createElement('h2');
    title.textContent = genre;
    div_container.appendChild(title)
    var div_caroussel = document.createElement('div');
    div_caroussel.setAttribute('class', 'caroussel');
    div_caroussel.setAttribute('id', `caroussel ${genre}`);
    div_container.appendChild(div_caroussel);
    var btn_l = document.createElement('a');
    btn_l.setAttribute('class', 'btn_left');
    btn_l.setAttribute('id', `btn_left_${genre}`);
    btn_l.textContent = '<';
    div_caroussel.appendChild(btn_l);
    let i = 0;
    for (movie of movies) {
        var div_item = document.createElement(('div'));
        div_item.setAttribute('class', `item${genre}`);
        div_caroussel.appendChild(div_item);
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('class', 'img')
        var image = document.createElement('img');
        image.setAttribute('class', `img_caroussel${genre}`);
        image.setAttribute('id', movie.id);
        image.setAttribute('src', movie.image_url);
        div_item.appendChild(a);
        a.appendChild(image);
        if (i > 4) {
            div_item.style.display = 'none'
        }
        i++;
    }
    var btn_r = document.createElement('a');
    btn_r.setAttribute('class', 'btn_right');
    btn_r.setAttribute('id', `btn_right_${genre}`);

    btn_r.textContent = '>';
    div_caroussel.appendChild(btn_r);
}


//scroll caroussel
var DicoIndex = {
    IndexHideAction: 0, IndexShowAction: 4, IndexHideComedy: 0, IndexShowComedy: 4,
    IndexHideFamily: 0, IndexShowFamily: 4, IndexHideC4: 0, IndexShowC4: 4}

function scroll_forward(genre, IndexHide, IndexShow, MoviesSelectors) {
    IndexHide = (IndexHide + 1) % 7;
    DicoIndex[`IndexHide${genre}`] = IndexHide;
    IndexShow = (IndexShow + 1) % 7;
    DicoIndex[`IndexShow${genre}`] = IndexShow;
    MoviesSelectors[IndexHide].style.display = 'none';
    MoviesSelectors[IndexShow].style.display = 'block'    
}

function scroll_backward(genre, IndexHide, IndexShow, MoviesSelectors) {
    IndexHide = (IndexHide - 1 + 7) % 7;
    DicoIndex[`IndexHide${genre}`] = IndexHide;
    IndexShow = (IndexShow - 1 + 7) % 7;
    DicoIndex[`IndexShow${genre}`] = IndexShow;
    MoviesSelectors[IndexHide].style.display = 'none';
    MoviesSelectors[IndexShow].style.display = 'block'

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
        .then(document.querySelector('#modale_content').style.display = 'flex')
 }



//main film modale
async function main_film(){
    await displayMainFilm(url);
    const main = document.querySelector('.main');
    const id = main.id;
    main.onclick = function () {
        create_modal(id);
    }
}

main_film()

//close btn modale
const close = document.querySelector('#close');
close.onclick = function () {
    document.querySelector('#modale_content').style.display = 'none'
}



/**DISPLAY CAROUSELS */


//Display caroussels and set buttns
async function display_caroussel(genre) {
    await create_caroussel(genre);
    var btnR = document.getElementById(`btn_right_${genre}`);
    var btnL = document.getElementById(`btn_left_${genre}`);
    var selectors = document.getElementsByClassName(`item${genre}`);
    btnR.onclick = scroll_forward(genre, DicoIndex[`IndexHide${genre}`],
        DicoIndex[`IndexShow${genre}`], selectors);
    btnL.onclick = scroll_backward(genre, DicoIndex[`IndexHide${genre}`],
        DicoIndex[`IndexShow${genre}`], selectors);
    
    const films = document.getElementsByClassName(`img_caroussel${genre}`);
    for (let film of films) {
        film.onclick = function () {
            let id = film.id
            create_modal(id);
        }   
    }   
    }

const genres = ['Action', 'Family', 'Comedy']
for (let genre of genres){
    display_caroussel(genre)
}
