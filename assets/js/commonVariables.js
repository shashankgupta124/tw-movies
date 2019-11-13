"use strict";
const API_KEY = "b5edb90984ff194c19f0463f984506c0";

// All movie API variables
export const VARIABLES = {
    IMG_PATH: `https://image.tmdb.org/t/p/w500`,    
    IMG_PATH_HD: `https://image.tmdb.org/t/p/original`,
    LATEST_MOVIES: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`,
    TRENDING_MOVIES: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
    POPULAR_MOVIES: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    MOVIE_GENRES: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    MOVIE_DETAILS_API: function (MOVIE_ID) {
        return `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    },
    RELATED_MOVIES_API: function (MOVIE_ID) {
        return `https://api.themoviedb.org/3/movie/${MOVIE_ID}/similar?api_key=${API_KEY}&language=en-US&page=1`
    },
    ACTOR_DETAILS_API: function (ACTOR_ID) {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}?api_key=${API_KEY}&language=en-US`
    },
    ACTOR_FILMOGRAPHY_API: function (ACTOR_ID) {
        return `https://api.themoviedb.org/3/person/${ACTOR_ID}/movie_credits?api_key=${API_KEY}&language=en-US`
    }
}