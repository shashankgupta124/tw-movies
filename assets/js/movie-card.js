"use strict";
import { VARIABLES } from "./commonVariables.js";
import { fun, getGenresName } from "./commonFunction.js";
import { api } from "./movies-api.js";

// movie card
export function getMovieItem(movieItem) {
    try {
        //var data = getMovieGenres(movieItem);
        var card = '';
        for (let [idx, movie] of movieItem.results.entries()) {
            if (idx < 4) {
                card += `<movie-card id="${movie.id}">
                        <img slot="movie-img" class="card-image" id="${movie.id}" src="${VARIABLES.IMG_PATH + movie.backdrop_path}" title="${movie.title}" role="img">
                        <span slot="movie-title">${movie.title}</span>
                        <i slot="movie-popularity" class="fa ${movie.popularity > 200 ? 'fa-heart' : 'fa-heart-o'} text-danger pull-right"></i>
                        <p slot="movie-genres" class="cart__item">${getGenresName(movie.genre_ids)}</p>
                        <span slot="movie-rating" class="card__rating"> ${fun.rating(movie.vote_average)} </span>
                        <span slot="more-info" class="show-more text-info pull-right">Show more</span>
                     </movie-card>`;
            }
        }
        return card;
    }
    catch (ex) { console.log("getMovieItem card error: ", ex); }
}

//movie card popup
customElements.define('movie-card',
class MovieCard extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        try {
            //bind card
            var link = document.querySelector('#card');
            let template = link.import.getElementById("movie-card").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));

            let quikView;
            const showModal = shadowRoot.getElementById("model");
            showModal.addEventListener('click', event => {
                api.getPopup(this.getAttribute("id"))
                    .then(response => {
                        console.log("getpop", response);
                        document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
                        quikView = document.createElement('model-popup');
                        quikView.innerHTML = `<span slot="movie-quick-title">${response.title}</span>
                    <img slot="movie-modal-image" class="popup--img" src="${VARIABLES.IMG_PATH + response.backdrop_path}" title="${response.title}"/> 
                    <span slot="movie-modal-description">${response.overview}</span>
                    <span slot="movie-modal-genres">${response.genres.map(genre => genre.name)}</span>
                    <p slot="movie-modal-cast" class="castt">${fun.castName(response.credits.cast)}</p>
                    <span slot="movie-modal-director">${fun.directName(response.credits.crew)}</span>
                    <span slot="movie-modal-rating">${fun.rating(response.vote_average)}</span>`;
                        //response.credits.crew.find(actor => actor.job === "Director").name
                        document.body.appendChild(quikView);
                    });
                event.preventDefault();
            });
            const moreInfo = shadowRoot.getElementById("moreinfo");
            moreInfo.addEventListener('click', event => {
                window.location.href = 'movie-details.html?id=' + this.getAttribute('id');
            });
        }
        catch (ex) { console.log("MovieCard error: ", ex); }
    }
    // attributeChangeCallback() { }
    // disconnectedCallback() { }
    // adoptedCallback() { }
})
//customElements.define('movie-card', MovieCard);