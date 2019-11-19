"use strict";
import { fun } from "./common-function/commonFunction.js";
import { getMovieItem } from './movie-card.js';

//range value
let input = fun.querry(".search-input");
let button = fun.querry(".search-button");
let clear = fun.querry(".clear-search");
let range = document.getElementById("range");
let rangeValue = document.getElementById("rangeValue");
rangeValue.textContent = range.value;
range.oninput = function () {
	rangeValue.textContent = this.value;
}

let search_movies = {
	search: () => {
		let movies = [], filteredMovie = [];;
		movies = JSON.parse(localStorage.getItem('movie'));
		console.log('movies:', movies);

		//unique result filter
		filteredMovie = fun.uniqueFilter(movies);

		// adding event listeners
		range.addEventListener('change', () => {
			search_movies.filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'rating');
		});
		input.addEventListener('keyup', () => {
			search_movies.filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'input');
		});
		button.addEventListener('click', () => {
			search_movies.filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'button');
		});
		clear.addEventListener('click', () => {
			search_movies.filterRecords(filteredMovie, 5, '', 'default');
		});
		search_movies.filterRecords(filteredMovie, 5, '', 'default');
	},

	filterRecords: (filteredMovie, starRating, searchParam, type) => {
		var totalCard = filteredMovie.filter(item => {
			try {
				let title = item.title.toUpperCase();
				let rating = Math.round(item.vote_average / 2);
				let genres = fun.getGenres(item.genre_ids);
				genres = genres.toUpperCase();
				// show all records
				if (search_movies.showAllRecords(starRating, searchParam, type)) {
					return item;
				};
				// show rating filter records
				if (search_movies.matchRating(type, rating, starRating)) {
					return item;
				}
				// show input filter records
				if (search_movies.findGenresAndMovie(searchParam, title, genres) && search_movies.matchInput(type, rating)) {
					return item;
				}
				// show rating with input filter records
				if (search_movies.findGenresAndMovie(searchParam, title, genres) && search_movies.matchRating(type, rating, starRating)) {
					return item;
				}
			}
			catch (exception) { console.log("filterRecords error: ", exception); }
		});

		let foundData = `${totalCard.length} movies found.`;
		let emptyData = `${totalCard.length} movie found.`;
		let results = totalCard.length <= 1 ? emptyData : foundData;

		// binding movie-card
		document.querySelector('.search-movies').innerHTML = getMovieItem(totalCard, totalCard.length);
		document.querySelector('.total-result').textContent = results;
	},

	showAllRecords: (starRating, searchParam, type) => {
		if (type == 'default' || (type == 'button' && searchParam == '')) {
			rangeValue.textContent = starRating; range.value = starRating; input.value = '';
			return true;
		}
	},

	findGenresAndMovie: (searchParam, title, genres) => {
		if (searchParam != '' && (title.includes(searchParam) || genres.includes(searchParam))) { return true; }
	},

	matchRating: (type, rating, starRating) => {
		if ((type == 'rating' || type == 'button') && rating == starRating) {
			return true;
		}
	},

	matchInput: (type, rating) => {
		if ((type == 'input' || type == 'button') && rating <= 5) {
			return true;
		}
	},
};
search_movies.search();