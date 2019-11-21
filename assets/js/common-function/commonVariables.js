"use strict";
import { fun } from './commonFunction.js';

export var allMoviesRes = [];
const API_KEY = "b5edb90984ff194c19f0463f984506c0";
// All movie API variables
export const VARIABLES = {
    IMG_PATH: `https://image.tmdb.org/t/p/w500`,
    IMG_PATH_HD: `https://image.tmdb.org/t/p/original`,
    DEFAULT_URL: `assets/img/No-image.jpg`,
    LATEST_MOVIES: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`,
    TRENDING_MOVIES: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
    POPULAR_MOVIES: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    MOVIE_GENRES: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    HOME: () => {
        return document.getElementsByClassName("home")[0];
    },
    ACTOR: () => {
        return document.getElementsByClassName("actorPage")[0];
    },
    DETAILS: () => {
        return document.getElementsByClassName("movie-details")[0];
    },
    SEARCH: () => {
        return document.getElementsByClassName("movie-search")[0];
    },
    MOVIE_DETAILS_API: MOVIE_ID => {
        return `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    },
    RELATED_MOVIES_API: MOVIE_ID => {
        return `https://api.themoviedb.org/3/movie/${MOVIE_ID}/similar?api_key=${API_KEY}&language=en-US&page=1`
    },
    ACTOR_DETAILS_API: ACTOR_ID => {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}?api_key=${API_KEY}&language=en-US`
    },
    ACTOR_FILMOGRAPHY_API: ACTOR_ID => {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}/movie_credits?api_key=${API_KEY}&language=en-US`
    },
};

if (allMoviesRes.length == 0) {
    try {
        allMoviesRes = (JSON.parse(localStorage.getItem('movie')));
        if (allMoviesRes != null) {
            allMoviesRes = fun.uniqueFilter(allMoviesRes);
        } else { allMoviesRes = []; }
    }
    catch (ex) { }
}