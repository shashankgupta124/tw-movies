import { rating, img_path, genresName, castName } from "./commonFunction.js";
//import { getMovieItem } from "./movie-card.js";
import { getMovies, API_KEY } from "./movies-api.js";

const MOVIE_ID = new URLSearchParams(window.location.search).get('id');
const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
const RELATED_MOVIES_API = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/similar?api_key=${API_KEY}&language=en-US&page=1`;

// Related movie call
getMovies(RELATED_MOVIES_API, 'related-movies', 0);

// movie details call

const getMovieDetails = fetch(MOVIE_DETAILS_API)
	.then(response => {
		return response.json();
	}).then((details) => {
		showMovieDetails(details);
	});
/*
const genresName = (genres) => {
	let genresName = [];
	genres.forEach((item, index) => {
		genresName.push(item.name);
	})
	return genresName;
}

const castName = (cast) => {
	let cast_name = '';
	cast.forEach(item => {
		console.log(item.id, ' ', item.name)
		cast_name += `<a href='movie-actor.html?id=${item.id}'>${item.name}</a>, `;
	})
	return cast_name;
}

const directName = (direct) => {
	let dname = '';
	direct.forEach(item => {
		if (item.job === "Director") {
			console.log(item.name)
			dname = item.name;
		}
	})
	return dname;
}
*/

const showMovieDetails = (movie) => {
	console.log("movie-details: ", movie);

	let section = document.querySelectorAll(".movie-details")[0];
	let bannerImg = section.querySelector('.banner__img');
	bannerImg.src = img_path + movie.backdrop_path;

	// let bannerImgg = section.querySelector('.banner__imgg');
	// bannerImgg.setAttribute("style", `background-image:url('${img_path + movie.backdrop_path}'); width:100%; height:100%; background-size:cover;`);

	let movieHeading = section.querySelector('.content__heading');
	movieHeading.textContent = movie.original_title;

	let movieDesc = section.querySelector('.content__desc');
	movieDesc.textContent = movie.overview;

	let movieGenres = section.querySelector(".genre-names");
	movieGenres.textContent = genresName(movie.genres);

	let movieRating = section.querySelector(".rating");
	movieRating.innerHTML = rating(movie.vote_average);

	let movieCast = section.querySelector(".cast");
	movieCast.innerHTML = castName(movie.credits.cast);

	let movieDirector = section.querySelector(".director");
	movieDirector.innerHTML = directName(movie.credits.crew);
}
//getMovieDetails();
