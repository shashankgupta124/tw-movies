"use strict";
import { VARIABLES } from "./commonVariables.js";

// common variable for all functions

export var gen = [];
export var fun = {
	getMovieGenres: function () {
		fetch(VARIABLES.MOVIE_GENRES)
			.then(response => { return response.json(); })
			.then((data) => { gen = data.genres; })
			.catch(function (error) { console.log("getMovieDetails: ", error) });
	},
	getGenres: function (genresIds, gens) {
		try {
			let names = [];
			gens.forEach(elements => {
				genresIds.forEach(id => { if (id == elements.id ? names.push(elements.name) : ''); });
			});
			return names.join(', ');
		}
		catch (ex) { console.log("getGenresName error: ", ex); }
	},
	rating: function (rating) {
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
				cast_name += `<a href='movie-actor.html?id=${item.id}'>${item.name}</a>, `;
			});
			return cast_name;
		}
		catch (ex) { console.log("castName error: ", ex); }
	},
	directName: function (director) {
		try {
			return director.find(item => item.job === "Director").name;
		}
		catch (ex) { console.log("directName error: ", ex); }
	},
	searchParam: function (id) {
		return new URLSearchParams(window.location.search).get(id);
	},
	bindTemplate: function (link, get_temp_Class, bindTempClass) {
		var temp_link = document.querySelector(link);
		let clone = temp_link.import.querySelector(get_temp_Class);
		document.getElementById(bindTempClass).appendChild(clone.cloneNode(true));
	},
	createText: function (element, _class, text) {
		if (text != null && text != "") {
			element.querySelector(_class).appendChild(document.createTextNode(text));
		}
		else {
			element.querySelector(_class).appendChild(document.createTextNode('Details not Provided by supplier!'));
		}
	},
	createTextNode: function (element, _class, text) {
		if (text != null && text != "") {
			return element.querySelector(_class).appendChild(document.createTextNode(text));
		}
	},
	appendChild: function (parent_node, _class, child) {
		return parent_node.querySelector(_class).appendChild(child);
	},
	querry: function (_class) { return document.querySelector(_class); },
};
fun.bindTemplate('#header', '.header', 'headerTemp'); // need to check template avalable or not