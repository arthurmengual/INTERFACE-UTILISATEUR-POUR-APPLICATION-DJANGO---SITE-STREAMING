entry_point = "http://localhost:8000/api/v1/titles/"

//function to fetch films on a single page in the api

async function get_film(genre, page) {
    const response = await fetch(entry_point + '?genre=' + genre + '&page=' + page);
    const data = await response.json();
    return data.results
}

//function to fectch 10 films il the api, on two different pages



let caroussel_tags = document.getElementsByClassName('img_film');



async function get_ten_films(genre){
    const films_1 = await get_film(genre, 1)
    const films_2 = await get_film(genre, 2)
    const all_films = await films_1.concat(films_2)
    return all_films
}

//function to display films images et infos in the caroussel, also stores the film id

async function display_films_imgs(genre) {
    const films = await get_ten_films(genre);
    for (i = 0; i < 7; i++) {
        caroussel_tags[i].src = films[i].image_url
    }
   
}



display_films_imgs('Action')

    
    
            