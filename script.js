url = 'http://localhost:8000/api/v1/titles/'





/***MAIN FILM */
fetch(url)
    .then(res => res.json())
    .then(data=>{document.querySelector('#main_film').src = data.results[0].image_url})







/****CAROUSSEL PART */



//get films infos
function get_movies(genre) {
    fetch(url + '?genre=' + genre + '&page=' + 1)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 4; i++) {
                document.querySelectorAll('.img_film')[i].src = data.results[i].image_url
            }
        }
        )
}
            
get_movies('Action')






/******MODALE PART */

//create and display modale
function create_modal(film_id) {
    fetch(url + film_id)
        .then(res => res.json())
        .then(data => {
            const title = data.title;
            const genre = data.genre;
            const img = data.image_url;
            document.querySelector('#modale_content').style.background = img
        })
        .then(document.querySelector('#modale_content').style.display = 'block')
 }


// display modale
//caroussel
const films = document.querySelectorAll('.img_film')
for (let i = 0; i < 4; i++) {
    films[i].onclick = function () {
        create_modal(499549);
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