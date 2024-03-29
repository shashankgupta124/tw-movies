"use strict";
import { fun } from "./common-function/commonFunction.js";
import { VARIABLES } from "./common-function/commonVariables.js";
import { api } from "./common-function/movies-api.js";

const MOVIE_ID = fun.searchParam('id');

const MOVIE_DETAILS = {
	// binding movie-card
	relatedMovies: () => {
		api.getMovies(VARIABLES.RELATED_MOVIES_API(MOVIE_ID), 'related-movies', 0);
	},
	// binding movie-details
	movieDetails: () => {
		api.getMovieDetails(MOVIE_ID).then(movie => {
			try {
				console.log("movie-details: ", movie);
				document.getElementsByClassName('fill-heart')[0].addEventListener('click', (event) => {
					try {
						if (event.target.classList[1] === 'fa-heart') {
							return event.target.className.replace('fa-heart', 'fa-heart-o');
						}
						else { return event.target.className.replace('fa-heart-o', 'fa-heart'); }
					} catch (ex) { }
				});

				let movie_details = fun.querry(".movie-details");
				movie_details.querySelector('.banner__img').src = VARIABLES.IMG_PATH_HD + movie.backdrop_path;
				movie_details.querySelector('.banner__img').setAttribute('title', movie.original_title);
				fun.createText(movie_details, '.content__heading', movie.original_title);
				fun.createText(movie_details, '.content__desc', movie.overview);
				fun.createText(movie_details, '.genre-names', fun.genresName(movie.genres));
				fun.createText(movie_details, '.director', fun.directName(movie.credits.crew));
				movie_details.querySelector(".rating").innerHTML = fun.rating(movie.vote_average);
				movie_details.querySelector(".cast").innerHTML = fun.castName(movie.credits.cast);
			}
			catch (ex) { console.log("showMovieDetails error: ", ex); }
		});
	}
};
MOVIE_DETAILS.relatedMovies();
MOVIE_DETAILS.movieDetails();
