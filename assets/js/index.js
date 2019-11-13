"use strict";
import { VARIABLES } from "./commonVariables.js";
import { api } from "./movies-api.js";

try {
    // Movie card list call
    api.getMovies(VARIABLES.LATEST_MOVIES, 'latest-movies', 0);
    api.getMovies(VARIABLES.TRENDING_MOVIES, 'trending-movies', 0);
    api.getMovies(VARIABLES.POPULAR_MOVIES, 'most-watched', 0);
}
catch (ex) { console.log("index page error: ", ex) }


