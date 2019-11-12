"use strict";
import { getMovieItem } from "./movie-card.js";
import { customElement } from "./card-popup.js";

export const API_KEY = "b5edb90984ff194c19f0463f984506c0";
export const LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;
export const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
export const POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
//const Details=`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;

// common card call
export function getMovies(url, _class, index) {
    return fetch(url)
        .then(movies => {
            return movies.json();
        }).then((response) => {
            console.log("getMovies:", response);
            document.getElementsByClassName(_class)[index].innerHTML = getMovieItem(response);
        });
}

export function getGenres(url) {
    return fetch(url)
        .then(response => response.json())
    // .then(movies => {
    //     return movies.json();
    // }).then((res) => {
    //     console.log("getGenres:--", res.genres);
    //     //myFunction(res);
    // });
}

export function getPopup(movie_id) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
        .then(response => {
            return response.json();
        })
}

// genres
export function getMovieGenress(genres) {
    return getGenres(MOVIE_GENRES, genres);
}

// // Movie card list call
// getMovies(LATEST_MOVIES, 'latest-movies', 0);
// getMovies(TRENDING_MOVIES, 'trending-movies', 0);
// getMovies(POPULAR_MOVIES, 'most-watched', 0);

// // PopUp call
customElement();