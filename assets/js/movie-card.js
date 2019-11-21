"use strict";
import { VARIABLES } from "./common-function/commonVariables.js";
import { fun } from "./common-function/commonFunction.js";
import { api } from "./common-function/movies-api.js";
import { bind_Modal } from "./card-popup.js";

fun.getMovieGenres();

// movie card
export function getMovieItem(movieItem, length) {
    try {
        var card = '';
        for (let [idx, movie] of movieItem.entries()) {
            if (idx < length) {
                let img = movie.backdrop_path ? VARIABLES.IMG_PATH + movie.backdrop_path : VARIABLES.DEFAULT_URL;
                card += `<movie-card id="${movie.id}">
                        <img slot="movie-img" class="card-image" id="${movie.id}" src="${img}" title="${movie.title}">
                        <span slot="movie-title">${movie.title}</span>
                        <i slot="movie-popularity" class="fa ${movie.popularity > 200 ? 'fa-heart' : 'fa-heart-o'} text-danger pull-right"></i>
                        <p slot="movie-genres" class="cart__item">${fun.getGenres(movie.genre_ids)}</p>
                        <span slot="movie-rating" class="card__rating"> ${fun.rating(movie.vote_average)} </span>
                        <span slot="more-info" class="show-more text-info pull-right">Show more</span>
                     </movie-card>`;
            }
        }
        return card;
    }
    catch (ex) { console.log("getMovieItem card error: ", ex); }
}

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

                //movie card popup
                let popup;
                const showModal = shadowRoot.getElementById("model");
                showModal.addEventListener('click', event => {
                    api.getPopup(this.getAttribute("id"))
                        .then(modalData => {
                            console.log("modal response: ", modalData);
                            bind_Modal(modalData);
                        });
                    event.preventDefault();
                });

                // show more call
                const moreInfo = shadowRoot.getElementById("moreinfo");
                moreInfo.addEventListener('click', event => {
                    window.location.href = 'movie-details.html?id=' + this.getAttribute('id');
                });
            }
            catch (ex) { console.log("MovieCard error: ", ex); }
        }
    });