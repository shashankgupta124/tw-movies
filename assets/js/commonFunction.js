
export let img_path = `https://image.tmdb.org/t/p/w500`;

// binding header
var headerLink = document.querySelector('link#header');
let template = headerLink.import.querySelector("header");
let header = document.getElementById('headerTemp');
header.appendChild(template.cloneNode(true));

// star rating
export function rating(rating) {
    const RATING = Math.round(rating / 2);
    let starCount = 5;
    let starRating ='';
    for (let i = 1; i <= starCount; i++) {
        starRating += `<i class="fa ${ RATING >= i ? 'fa-star' : 'fa-star-o' }"></i>`;
    }
    return starRating;
}

// movie details call
export function getMovieDetails(){ 
    return fetch(MOVIE_DETAILS_API)
	.then(response => {
		return response.json();
	}).then((details) => {
		showMovieDetails(details);
	});
}
export function genresName(genres){
	let genresName = [];
	genres.forEach((item, index) => {
		genresName.push(item.name);
	})
	return genresName;
}

export function castName(cast){
	let cast_name = '';
	cast.forEach(item => {
		console.log(item.id, ' ', item.name)
		cast_name += `<a href='movie-actor.html?id=${item.id}'>${item.name}</a>, `;
	})
	return cast_name;
}