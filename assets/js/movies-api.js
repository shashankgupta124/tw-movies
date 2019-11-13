"use strict";
import { getMovieItem } from "./movie-card.js";
import { customElement } from "./card-popup.js";
import { VARIABLES } from "./commonVariables.js";

export var api = {
    // common call for movie card
    getMovies: function (url, _class, index) {
        return fetch(url)
            .then(movies => { return movies.json(); })
            .then((response) => {
                console.log("getMovies:", response);
                document.getElementsByClassName(_class)[index].innerHTML = getMovieItem(response);
            }).catch(function (error) { console.log("getMovies error: ", error) });
    },
    // movie details popUp
    getPopup: function (movie_id) {
        return fetch(VARIABLES.MOVIE_DETAILS_API(movie_id))
            .then(response => { return response.json(); })
            .catch(function (error) { console.log("getPopup error: ", error) });
    },
    getActor: function (actor_id) {
        return fetch(VARIABLES.ACTOR_DETAILS_API(actor_id))
            .then(response => { return response.json(); })
            .catch(function (error) { console.log("getActor error: ", error) });
    },
    getFilmography: function (actor_id) {
        return fetch(VARIABLES.ACTOR_FILMOGRAPHY_API(actor_id))
            .then(response => { return response.json(); })
            .catch(function (error) { console.log("getFilmography error: ", error) });
    }
}

// auto load for PopUp
customElement();