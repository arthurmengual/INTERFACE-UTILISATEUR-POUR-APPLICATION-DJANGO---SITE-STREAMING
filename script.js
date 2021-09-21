const entry_point = "http://localhost:8000/api/v1/titles/"

var search = document.getElementById("search_logo");

var input_search = document.getElementById("input");

search.onclick = function() {
    input_search.style.display = 'block'
}



/* modales main film */

var main_film = document.getElementById("main_film_link")

var modale = document.getElementById("modale_content")

var close_btn = document.getElementById("close")


main_film.onclick = function (){
    modale.style.display = 'block'
}

close_btn.onclick = function () {
    modale.style.display = "none"
}


/*fonction create modal*/


// function modal(film_id) {
// //     /*search in server data corresponding infos*/
// //     /*create the modal*/
// //     /*display modal*/
// //     /* close modal*/
//     fetch(entry_point + id)

//  }


/*CAROUSEL*/

var films = document.getElementsByClassName("img_film")

function film(film, i) {
    fetch(entry_point)
        .then(res => res.json())
        .then(data => film.src = data.results[i].image_url)
}

for (let i in films) {
    film(films[i], i);
    i++
}

//event listener to open modal

for (let i in films) {
    films[i].onclick = function (){
        modale.style.display = 'block'
    }
}

//fetch autant de pic que de balises

// var pix = [];
// let i = 1;

// while (pix.length < films.length) {
//     console.log(i, pix)
//     if (i == 1) {
//         fetch(entry_point)
//             .then(res => res.json())
//             .then(data => data.results.forEach(item => pix.push(item)))
//     } else {
//         fetch(entry_point + '?page=' + i)
//             .then(res => res.json())
//             .then(data => data.results.forEach(item => pix.push(item)))
//     }
//     i++;
// }
// console.log(pix)











//creer une fonction get categories film

//liste avec mes 7 images de l'api

//stocker les id de films dans id de la balise html

//laisser structure html pour la modale et remplacer les elt avec une fonction js