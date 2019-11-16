"use strict";
import { getMovieItem } from "../movie-home/movie-card.js";
import { VARIABLES } from "./commonVariables.js";

// commom function for all movie api call  

const allMoviesResponse = []; 
//do this by localStorage to avoid api call
// do the genres with seme method


export var api = {
    getAllMoviesResponse: function () {
        return allMoviesResponse;
    },
    getMovies: function (url, _class, index) {
        return fetch(url)
            .then(movies => { return movies.json(); })
            .then((response) => {
                console.log("getMovies:", response);
                document.getElementsByClassName(_class)[index].innerHTML = getMovieItem(response);
                allMoviesResponse.push({ _class: response });
            }).catch(function (error) { console.log("getMovies error: ", error) });
    },
    getPopup: function (movie_id) {
        return fetch(VARIABLES.MOVIE_DETAILS_API(movie_id))
            .then(response => { return response.json(); })
            .catch(function (error) { console.log("getPopup error: ", error) });
    },
    getMovieDetails: function (movie_id) {
        return fetch(VARIABLES.MOVIE_DETAILS_API(movie_id))
            .then(response => { return response.json(); })
            //.then((details) => { showMovieDetails(details); })
            .catch(function (error) { console.log("getMovieDetails: ", error) });
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
    },
}