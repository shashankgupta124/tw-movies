"use strict";
import { getMovieItem } from "../movie-card.js";
import { VARIABLES, allMoviesRes } from "./commonVariables.js";

// commom function for all movie api call  
export var api = {
    getMovies: (url, _class, index) => {
        fetch(url)
            .then(movies => { return movies.json(); })
            .then(response => {
                console.log("getMovies:", response);
                document.getElementsByClassName(_class)[index].innerHTML = getMovieItem(response.results, 4);

                //store response for search page
                allMoviesRes.push(...response.results);
                localStorage.setItem('movie', JSON.stringify(allMoviesRes));

            }).catch(error => { console.log("getMovies error: ", error) });
    },
    getPopup: movie_id => {
        return fetch(VARIABLES.MOVIE_DETAILS_API(movie_id))
            .then(response => { return response.json(); })
            .catch(error => { console.log("getPopup error: ", error) });
    },
    getMovieDetails: movie_id => {
        return fetch(VARIABLES.MOVIE_DETAILS_API(movie_id))
            .then(response => { return response.json(); })
            //.then((details) => { showMovieDetails(details); })
            .catch(error => { console.log("getMovieDetails: ", error) });
    },
    getActor: actor_id => {
        return fetch(VARIABLES.ACTOR_DETAILS_API(actor_id))
            .then(response => { return response.json(); })
            .catch(error => { console.log("getActor error: ", error) });
    },
    getFilmography: actor_id => {
        return fetch(VARIABLES.ACTOR_FILMOGRAPHY_API(actor_id))
            .then(response => { return response.json(); })
            .catch(error => { console.log("getFilmography error: ", error) });
    },
}