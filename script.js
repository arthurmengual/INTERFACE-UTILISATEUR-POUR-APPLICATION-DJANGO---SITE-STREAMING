url = 'http://localhost:8000/api/v1/titles/'


/***MAIN FILM */
fetch(url)
    .then(res => res.json())
    .then(data=>{document.querySelector('#main_film').src = data.results[0].image_url})



/****CAROUSSEL PART */


//function to get movie on a single page of the api
async function get_film(genre, page) {
    const response = await fetch(url + '?genre=' + genre + '&page=' + page);
    const data = await response.json();
    return data.results
}

//function to fectch films on two pages of the api
let caroussel_tags = document.querySelectorAll('.img_film');

async function get_ten_films(genre){
    const films_1 = await get_film(genre, 1)
    const films_2 = await get_film(genre, 2)
    const all_films = await films_1.concat(films_2)
    return all_films
}


//function to display films images et infos in the caroussel, also stores the film id
let k = -1;
let j = 0;

async function display_films_imgs(genre) {
    const films = await get_ten_films(genre);
    const balises = document.querySelectorAll('.img_film');
    for (let balise of balises) {
        k = (k + 1) % 7;
        console.log('a la boucle k=' + k);
        balise.src = films[k].image_url;
        balise.id = films[k].id;
    }
    k = j;
    j = (j+1)%7;
}
         
display_films_imgs('Action')


//buttons
btn_right = document.querySelector('#btn_right');
btn_left = document.querySelector('#btn_left');

btn_right.onclick = function () {
    console.log('au click k =' + k);
    display_films_imgs('Action');
}

btn_left.onclick = function () {
    display_films_imgs('Action')
}


/******MODALE PART */


//create and display modale
function create_modal(film_id) {
    fetch(url + film_id)
        .then(res => res.json())
        .then(data => {
            const title = data.title;
            const genre = data.genre;
            const img = data.image_url;
            const release_date = data.genre;
            const rate = data.genre;
            const score = data.genre;
            const director = data.genre;
            const actors = data.genre;
            const time = data.genre;
            const country = data.genre;
            const box_office = data.genre;
            const resumen = data.genre;
            document.querySelector('#modale_content').style.backgroundImage = 'url(' + img + ')'
            document.querySelector('#film_infos').innerHTML = title + '<br/>' + genre;
        })
        .then(document.querySelector('#modale_content').style.display = 'block')
 }


//caroussel
const films = document.querySelectorAll('.img_film')
for (let i = 0; i < 4; i++) {
    films[i].onclick = function () {
        let id = films[i].id
        create_modal(id);
    }
}


//main film
document.querySelector('#main_film').onclick = function () {
    create_modal(499549);
}


//close modale
const close = document.querySelector('#close');
close.onclick = function () {
    document.querySelector('#modale_content').style.display = 'none'
}

