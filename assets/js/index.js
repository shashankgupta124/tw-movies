"use strict";
import { VARIABLES } from "./common-function/commonVariables.js";
import { api } from "./common-function/movies-api.js";

//if (VARIABLES.HOME) {
    try {
        // Movie card list call
        api.getMovies(VARIABLES.LATEST_MOVIES, 'latest-movies', 0);
        api.getMovies(VARIABLES.TRENDING_MOVIES, 'trending-movies', 0);
        api.getMovies(VARIABLES.POPULAR_MOVIES, 'most-watched', 0);
    }
    catch (ex) { console.log("index page error: ", ex) }
//}