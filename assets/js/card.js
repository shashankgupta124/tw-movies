import { rating } from "./rating.js";
import { getMovieGenress } from "./api.js";
import { moviePopup } from "./model.js";

export function getImagePath(path) {
    return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getMovieItem(movieItem) {
    var card = '';
    
    for (let [idx, movie] of movieItem.results.entries()) {

        //moviePopup(movie.id);

        if (idx < 4) {
            card += `
            <section class="card">
                <figure>
                    <img class="card__image" onclick='moviePopup(${movie.id});' src="${getImagePath(movie.poster_path)}" role="img">
                </figure>
                <section class="card__desc">
                    <h3 class="card__title">
                        <span>${movie.title}</span>                        
                        <i class="fa ${movie.popularity > 100 ? 'fa-heart' : 'fa-heart-o'} text-danger pull-right"></i>
                    </h3>
                    <p class="cart__item">${getMovieGenress(movie.genre_ids), movie.genre_ids}</p>
                    <h4 class="card__rating">
                        ${rating(movie.vote_average)}
                        <a href="" class="show-more text-info pull-right">Show more</a>
                    </h4>
                </section>
            </section>`;
        }
    }
    return card;
}