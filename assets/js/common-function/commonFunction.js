"use strict";
import { VARIABLES } from "./commonVariables.js";

const headerLink = 'assets/template/header.html';
const quickViewLink = 'assets/template/popup.html'
// common variable for all functions
export let fun = {
	getMovieGenres: () => {
		fetch(VARIABLES.MOVIE_GENRES)
			.then(response => response.json())
			.then((data) => localStorage.setItem('genres', JSON.stringify(data.genres)))
			.catch(error => console.log("getMovieDetails: ", error));
	},
	getGenres: genresIds => {
		let gens = JSON.parse(localStorage.getItem('genres'));
		try {
			let names = [];
			gens.map(elements => {
				genresIds.map(id => { if (id == elements.id ? names.push(elements.name) : ''); });
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
			let genresName = genres.map(item => item.name);
			return genresName.join(', ');
		}
		catch (ex) { console.log("genresName error: ", ex); }
	},
	castName: cast => {
		try {
			let cast_name = '';
			cast.map(item => {
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
		try {
			let ids = [], filtered = [];
			response.filter(item => {
				if (item != '') {
					if (ids.indexOf(item.id) == -1) {
						ids.push(item.id);
						filtered.push(item);
					}
				}
			});
			return response = filtered;
		}
		catch (ex) { console.log("uniqueFilter error: ", ex); }
	},
	searchParam: id => {
		try {
			return new URLSearchParams(window.location.search).get(id);
		}
		catch (ex) { console.log("searchParam error: ", ex); }
	},
	bindTemplate: async (get_temp_Class, bindTempClass) => {
		try {
			const response = await fetch(headerLink);
			const templateHTML = await response.text();
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = templateHTML;
			
			const clone = tempDiv.querySelector(get_temp_Class);
			// const temp_link = document.querySelector(link);
			// let clone = temp_link.import.querySelector(get_temp_Class);
			document.getElementById(bindTempClass).appendChild(clone.cloneNode(true));
		}
		catch (ex) { console.log("bindTemplate error: ", ex); }
	},
	createText: (element, _class, text) => {
		try {
			if (text != null && text != "") {
				element.querySelector(_class).appendChild(document.createTextNode(text));
			}
			else {
				element.querySelector(_class).appendChild(document.createTextNode('Details not Provided by supplier!'));
			}
		}
		catch (ex) { console.log("createText error: ", ex); }
	},
	createTextNode: (element, _class, text) => {
		try {
			if (text != null && text != "") {
				return element.querySelector(_class).appendChild(document.createTextNode(text));
			}
		}
		catch (ex) { console.log("createTextNode error: ", ex); }
	},
	appendChild: (parent_node, _class, child) => {
		try {
			return parent_node.querySelector(_class).appendChild(child);
		}
		catch (ex) { console.log("appendChild error: ", ex); }
	},
	querry: _class => {
		try {
			return document.querySelector(_class);
		}
		catch (ex) { console.log("querry error: ", ex); }
	},
	activeLink: () => {
		try {
			let head = document.querySelectorAll('.navbar__item');
			if (window.location.href.includes('search-page.html') == true) {
				head[1].setAttribute('class', 'navbar__item navbar__item--active');
				head[0].setAttribute('class', 'navbar__item');
			} else {
				head[0].setAttribute('class', 'navbar__item navbar__item--active');
				head[1].setAttribute('class', 'navbar__item');
			}
		}
		catch (ex) { console.log("activeLink error: ", ex); }
	},
	importLink: async (linkID, tempID) => {
		try {
			//bind card
			const response = await fetch(quickViewLink);
			const templateHTML = await response.text();
			let template = document.createElement('div');
			template.innerHTML = templateHTML; 
			template = template.getElementsByTagName('template')['model-popup'].content
			
			// let link = fun.querry('#quick-view');
			// let template = link.import.getElementById("model-popup").content;
			let shadowRoot = this.attachShadow({ mode: 'open' });
			shadowRoot.appendChild(template.cloneNode(true));
		}
		catch (ex) { console.log("importLink error: ", ex); }
	},
	//support cross browser
	import_support: () => {
		try {
			const SUPPORTS = 'import' in document.createElement('link');
			if (!SUPPORTS) {
				const polymer = document.createElement('script');
				polymer.src = "assets/js/polymer.min.js";
				document.body.appendChild(polymer);
			}
			return SUPPORTS;
		}
		catch (ex) { console.log("import_support error: ", ex); }
	}
};
fun.bindTemplate('.header', 'headerTemp');

// if (fun.import_support()) {
// 	fun.bindTemplate('#header', '.header', 'headerTemp');
// } else {
// 	window.addEventListener('HTMLImportsLoaded', function (e) {
// 		fun.bindTemplate('#header', '.header', 'headerTemp');
// 	});
// }

fun.activeLink();