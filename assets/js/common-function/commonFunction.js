"use strict";
import { VARIABLES } from "./commonVariables.js";

// common variable for all functions
export var fun = {
	getMovieGenres: () => {
		fetch(VARIABLES.MOVIE_GENRES)
			.then(response => { return response.json(); })
			.then((data) => { localStorage.setItem('genres', JSON.stringify(data.genres)); })
			.catch(error => { console.log("getMovieDetails: ", error) });
	},
	getGenres: genresIds => {
		var gens = JSON.parse(localStorage.getItem('genres'));
		try {
			let names = [];
			gens.forEach(elements => {
				genresIds.forEach(id => { if (id == elements.id ? names.push(elements.name) : ''); });
			});
			return names.join(', ');
		}
		catch (ex) { console.log("getGenresName error: ", ex); }
	},
	rating: rating => {
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
	genresName: genres => {
		try {
			let genresName = [];
			genres.forEach((item, index) => {
				genresName.push(item.name);
			});
			return genresName;
		}
		catch (ex) { console.log("genresName error: ", ex); }
	},
	castName: cast => {
		try {
			let cast_name = '';
			cast.forEach(item => {
				cast_name += `<a href='movie-actor.html?id=${item.id}'>${item.name}</a>, `;
			});
			return cast_name;
		}
		catch (ex) { console.log("castName error: ", ex); }
	},
	directName: director => {
		try {
			return director.find(item => item.job === "Director").name;
		}
		catch (ex) { console.log("directName error: ", ex); }
	},
	uniqueFilter: response => {
		let ids = [], filtered = [];
		response.map(item => {
			if (item != '') {
				if (ids.indexOf(item.id) == -1) {
					ids.push(item.id);
					filtered.push(item);
				}
			}
		});
		return response = filtered;
	},
	searchParam: id => {
		return new URLSearchParams(window.location.search).get(id);
	},
	bindTemplate: (link, get_temp_Class, bindTempClass) => {
		var temp_link = document.querySelector(link);
		let clone = temp_link.import.querySelector(get_temp_Class);
		document.getElementById(bindTempClass).appendChild(clone.cloneNode(true));
	},
	createText: (element, _class, text) => {
		if (text != null && text != "") {
			element.querySelector(_class).appendChild(document.createTextNode(text));
		}
		else {
			element.querySelector(_class).appendChild(document.createTextNode('Details not Provided by supplier!'));
		}
	},
	createTextNode: (element, _class, text) => {
		if (text != null && text != "") {
			return element.querySelector(_class).appendChild(document.createTextNode(text));
		}
	},
	appendChild: (parent_node, _class, child) => {
		return parent_node.querySelector(_class).appendChild(child);
	},
	querry: _class => { return document.querySelector(_class); },
	activeLink: () => {
		let head = document.querySelectorAll('.navbar__item');
		if (window.location.href.includes('search-page.html') == true) {
			head[1].setAttribute('class', 'navbar__item navbar__item--active');
			head[0].setAttribute('class', 'navbar__item');
		} else {
			head[0].setAttribute('class', 'navbar__item navbar__item--active');
			head[1].setAttribute('class', 'navbar__item');
		}
	},
	importLink: (linkID, tempID) => {
		var link = fun.querry('#quick-view');
		let template = link.import.getElementById("model-popup").content;
		let shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.cloneNode(true));
	},
	//support cross browser
	import_support: () => {
		const SUPPORTS = 'import' in document.createElement('link');
		if (!SUPPORTS) {
			const polymer = document.createElement('script');
			polymer.src = "assets/js/polymer.min.js";
			document.body.appendChild(polymer);
		}
		return SUPPORTS;
	},
};
fun.bindTemplate('#header', '.header', 'headerTemp');
fun.activeLink();

// if (fun.import_support()) {
// 	fun.bindTemplate('#header', '.header', 'headerTemp');
// } else {
// 	window.addEventListener('HTMLImportsLoaded', function (e) {
// 		fun.bindTemplate('#header', '.header', 'headerTemp');
// 	});
// }