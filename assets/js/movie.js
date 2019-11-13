"use strict";
import { fun } from "./commonFunction.js";
import { VARIABLES } from "./commonVariables.js";
import { api } from "./movies-api.js";

const MOVIE_ID = new URLSearchParams(window.location.search).get('id');

// Related movie call
api.getMovies(VARIABLES.RELATED_MOVIES_API(MOVIE_ID), 'related-movies', 0);

// movie details call
const getMovieDetails = fetch(VARIABLES.MOVIE_DETAILS_API(MOVIE_ID))
	.then(response => { return response.json(); })
	.then((details) => { showMovieDetails(details); })
	.catch(function (error) { console.log("getMovieDetails: ", error) });

// movie details 
const showMovieDetails = (movie) => {
	try {
		console.log("movie-details: ", movie);
		let section = document.querySelectorAll(".movie-details")[0];
		let bannerImg = section.querySelector('.banner__img').src = VARIABLES.IMG_PATH + movie.backdrop_path;
		// let bannerImgg = section.querySelector('.banner__imgg').setAttribute("style", `background-image:url('${img_path + movie.backdrop_path}'); width:100%; height:100%; background-size:cover;`);
		section.querySelector('.content__heading').textContent = movie.original_title;
		section.querySelector('.content__desc').textContent = movie.overview;
		section.querySelector(".genre-names").textContent = fun.genresName(movie.genres);
		section.querySelector(".rating").innerHTML = fun.rating(movie.vote_average);
		section.querySelector(".cast").innerHTML = fun.castName(movie.credits.cast);
		section.querySelector(".director").innerHTML = fun.directName(movie.credits.crew);
	}
	catch (ex) { console.log("showMovieDetails error: ", ex); }
}
//getMovieDetails();