"use strict";
import { VARIABLES } from "./commonVariables.js";

// binding header
var headerLink = document.querySelector('link#header');
let template = headerLink.import.querySelector("header");
let header = document.getElementById('headerTemp');
header.appendChild(template.cloneNode(true));

var genres = [];

// movie genres filter
export function getGenresName(genresIds) {
	try {
		let names = [];
		genres.forEach(elements => {
			genresIds.forEach(id => { if (id == elements.id ? names.push(elements.name) : ''); });
		});
		return names.join(', ');
	}
	catch (ex) { console.log("getGenresName error: ", ex); }
}

// common variable for functions
export var fun = {
	// movie genres API call
	getMovieGenres: function () {
		fetch(VARIABLES.MOVIE_GENRES)
			.then(response => { return response.json(); })
			.then((data) => { genres = data.genres; })
			.catch(function (error) { console.log("getMovieDetails: ", error) });
	},
	//Count star rating
	rating: function (rating) {// star rating
		try {
			const RATING = Math.round(rating / 2);
			let starCount = 5, starRating = '';

			for (let i = 1; i <= starCount; i++) {
				starRating += `<i class="fa ${RATING >= i ? 'fa-star' : 'fa-star-o'}"></i>`;
			}
			return starRating;
		}
		catch (ex) { console.log("rating error: ", ex); }
	},
	// 
	genresName: function (genres) {
		try {
			let genresName = [];
			genres.forEach((item, index) => {
				genresName.push(item.name);
			});
			return genresName;
		}
		catch (ex) { console.log("genresName error: ", ex); }
	},
	castName: function (cast) {
		try {
			let cast_name = '';
			cast.forEach(item => {
				console.log(item.id, ' ', item.name)
				cast_name += `<a href='movie-actor.html?id=${item.id}'>${item.name}</a>, `;
			});
			return cast_name;
		}
		catch (ex) { console.log("castName error: ", ex); }
	},
	directName: function (direct) {
		try {
			let director = '';
			direct.forEach(item => {
				if (item.job === "Director" ? director = item.name : 'Not provided by supplier!');
			});
			return director;
		}
		catch (ex) { console.log("directName error: ", ex); }
	}
}
fun.getMovieGenres();