import { getMovies, LATEST_MOVIES, TRENDING_MOVIES, POPULAR_MOVIES } from "./movies-api.js";

// Movie card list call
getMovies(LATEST_MOVIES, 'latest-movies', 0);
getMovies(TRENDING_MOVIES, 'trending-movies', 0);
getMovies(POPULAR_MOVIES, 'most-watched', 0);


