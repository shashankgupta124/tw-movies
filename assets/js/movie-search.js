"use strict";
import { fun } from "./common-function/commonFunction.js";
import { getMovieItem } from './movie-card.js';
//import { fun } from './common-function/commonFunction.js';

//range value
let input = document.querySelector(".search-input");
let button = document.querySelector(".search-button");
let clear = document.querySelector(".clear-search");
let range = document.getElementById("range");
let rangeValue = document.getElementById("rangeValue");
rangeValue.textContent = range.value;
range.oninput = function () {
	rangeValue.textContent = this.value;
}

let search_movies = {
	search: function () {
		let allMovieRes = [];
		allMovieRes = JSON.parse(localStorage.getItem('movie'));

		// let filteredMovie = [];
		// filteredMovie = JSON.parse(localStorage.getItem('movie'));

		//console.log('allMovieRes:', allMovieRes);

		//unique result filter
		let ids = [], filteredMovie = [];
		allMovieRes.map(item => {
			if (item != '') {
				if (ids.indexOf(item.id) == -1) {
					ids.push(item.id);
					filteredMovie.push(item);
				}
			}
		});

		range.addEventListener('change', function () {
			filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'rating');

		});
		input.addEventListener('keyup', function () {
			filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'input');

		});
		button.addEventListener('click', function () {
			filterRecords(filteredMovie, range.value, input.value.toUpperCase(), 'button');

		});
		clear.addEventListener('click', function () {
			filterRecords(filteredMovie, 5, '', 'default');

		});
		filterRecords(filteredMovie, 5, '', 'default');
	}
};
search_movies.search();

function filterRecords(filteredMovie, starRating, searchParam, type) {

	var totalCard = filteredMovie.filter(item => {
		try {
			let title = item.title.toUpperCase();
			let rating = Math.round(item.vote_average / 2);
			let genres = fun.getGenres(item.genre_ids);

			// // show all records
			if (type == 'default' || (type == 'button' && searchParam == '')) {
				rangeValue.textContent = starRating;
				range.value = starRating;
				input.value = '';
				return item;
			}
			// show rating filter records
			if (rating == starRating && type == 'rating' && searchParam == '') {
				return item;
			}
			// show input filter records
			if (title.includes(searchParam) && (type == 'input' || type == 'button') && rating <= starRating) {
				return item;
			}
			// show rating with input filter records
			if (title.includes(searchParam) && (type == 'rating' || type == 'button') && rating == starRating) {
				return item;
			}
			// show genres filter records
			if (searchParam != '' && (type == 'input' || type == 'button') && rating <= starRating) {
				if (genres.toUpperCase().includes(searchParam)) {
					return item;
				}
			}
			if (searchParam != '' && (type == 'rating' || type == 'button') && rating == starRating) {
				if (genres.toUpperCase().includes(searchParam)) {
					return item;
				}
			}
		}
		catch (exception) { console.log("filterRecords error: ", exception); }
	});
	console.log(totalCard);

	let foundData = `${totalCard.length} movies found.`;
	let emptyData = `${totalCard.length} movie found.`;
	let results = totalCard.length <= 1 ? emptyData : foundData;

	document.querySelector('.total-result').textContent = results;
	// binding movie-card
	document.querySelector('.search-movies').innerHTML = getMovieItem(totalCard, totalCard.length);
}