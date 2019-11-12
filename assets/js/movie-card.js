import { rating } from "./commonFunction.js";
import { getMovieGenress, getPopup } from "./movies-api.js";
//import { moviePopup } from "./model.js";

export function getImagePath(path) {
    return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getMovieItem(movieItem) {
    var card = '';
    for (let [idx, movie] of movieItem.results.entries()) {
        if (idx < 4) {
            card += `<movie-card id="${movie.id}">
                        <img slot="movie-img" class="card-image" id="${movie.id}" src="${getImagePath(movie.backdrop_path)}" title="${movie.title}" role="img">
                        <span slot="movie-title">${movie.title}</span>
                        <i slot="movie-popularity" class="fa ${movie.popularity > 200 ? 'fa-heart' : 'fa-heart-o'} text-danger pull-right"></i>
                        <p slot="movie-genres" class="cart__item">${movie.genre_ids}</p>
                        <span slot="movie-rating" class="card__rating"> ${rating(movie.vote_average)} </span>
                        <span slot="more-info" class="show-more text-info pull-right">Show more</span>
                     </movie-card>`;
        }
    }
    return card;
}

class MovieCard extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        //bind card
        var link = document.querySelector('#card');
        let template = link.import.getElementById("movie-card").content;
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        // binding css
        // const style = document.createElement("link");
        // style.setAttribute('rel', 'stylesheet');
        // style.setAttribute('href', 'assets/css/card.css');
        // shadowRoot.appendChild(style);

        const showModal = shadowRoot.getElementById("model");
        let quikView;
        showModal.addEventListener('click', event => {
            getPopup(this.getAttribute("id"))
                .then(response => {
                    console.log("getpop", response);
                    document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
                    quikView = document.createElement('model-popup');
                    quikView.innerHTML = `<span slot="movie-quick-title">${response.title}</span>
                    <img slot="movie-modal-image" class="popup--img" src="${getImagePath(response.backdrop_path)}" title="${response.title}"/> 
                    <span slot="movie-modal-description">${response.overview}</span>
                    <span slot="movie-modal-genres">${response.genres.map(genre => genre.name)}</span>
                    <span slot="movie-modal-cast">${response.credits.cast.slice(0, 5).map(actor => actor.name)}</span>
                    <span slot="movie-modal-director">${response.credits.crew.find(actor => actor.job === "Director").name}</span>
                    <span slot="movie-modal-rating">${rating(response.vote_average)}</span>`;
                    document.body.appendChild(quikView);
                });
            event.preventDefault();
        });
        const moreInfo = shadowRoot.getElementById("moreinfo");
        moreInfo.addEventListener('click', event => {
            window.location.href ='movie-details.html?id=' + this.getAttribute('id');
        })
    }

    // attributeChangeCallback() { }
    // disconnectedCallback() { }
    // adoptedCallback() { }
}
customElements.define('movie-card', MovieCard);