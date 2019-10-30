"use strict";
import { getMovieItem } from "./card.js";

const API_KEY = "b5edb90984ff194c19f0463f984506c0";

const LatestMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;
const TrendingMovies = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const PopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const MovieGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
//const Details=`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;

function getMovies(url, _class, index) {
    return fetch(url)
        .then(movies => {
            return movies.json();
        }).then((res) => {
            console.log(res);
            document.getElementsByClassName(_class)[index].innerHTML = getMovieItem(res);
        });
}

function getGenres(url) {
    return fetch(url)
        .then(movies => {
            return movies.json();
        }).then((res) => {
            console.log(res.genres);
            myFunction(res);
        });
}

export function getDetails(movieID) {
    const Details =`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    return fetch(Details)
        .then(movies => {
            return movies.json();
        }).then((res) => {
            console.log(res);
            return res;
            //showPopup(res);
        });
}

export function getLatestMovies() {
    getMovies(LatestMovies, 'latest-movies', 0);
}

export function getPopularMovies() {
    getMovies(PopularMovies, 'most-watched', 0);
}

export function getTrendingMovies() {
    getMovies(TrendingMovies, 'trending-movies', 0);
}

export function getMovieGenress(genres) {
   return getGenres(MovieGenres, genres);
}

function myFunction(value) {
    //data.genres.forEach(myFunction);
    var txt = '';
    // for (let j = 0; j => ids.length -1; j++) {
    //     if (value.id == ids[j]) {
    //         txt += res.genres[i].name + ',';
    //     }
    // }
}