"use strict";
import { VARIABLES } from "../common-function/commonVariables.js";
import { fun } from "../common-function/commonFunction.js";

// PopUp custom element
export function bind_Modal(modalData) {

    let modal;
    document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
    modal = document.createElement('model-popup');
    modal.innerHTML = `<span slot="movie-quick-title">${modalData.title}</span>
                      <img slot="movie-modal-image" class="popup--img" src="${VARIABLES.IMG_PATH + modalData.backdrop_path}" title="${modalData.title}"/> 
                      <span slot="movie-modal-description">${modalData.overview}</span>
                      <span slot="movie-modal-genres">${modalData.genres.map(genre => genre.name)}</span>
                      <p slot="movie-modal-cast" class="castt">${fun.castName(modalData.credits.cast)}</p>
                      <span slot="movie-modal-director">${fun.directName(modalData.credits.crew)}</span>
                      <span slot="movie-modal-rating">${fun.rating(modalData.vote_average)}</span>`;
    document.body.appendChild(modal);
}

//export function modalPopUp() {
customElements.define("model-popup",
    class MoviePopUp extends HTMLElement {
        constructor() { super(); }

        connectedCallback() {
            try {
                // Bring in the import content.
                var link = fun.querry('#quick-view');
                console.log(link);

                let template = link.import.getElementById("model-popup").content;
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.appendChild(template.cloneNode(true));

                //link card css file
                const linkElement = document.createElement("link");
                linkElement.setAttribute('rel', 'stylesheet');
                linkElement.setAttribute('href', 'assets/css/popup.css');
                shadowRoot.appendChild(linkElement);

                //close the modal
                shadowRoot.getElementById('modal-close').addEventListener('click', removeModal);
                function removeModal() {
                    document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
                }
                window.addEventListener('click', removeModal);
            }
            catch (ex) { console.log("MoviePopUp error: ", ex); }

        }
        //called when the element is distroyed
        disconnectedCallback() {
            try {
                function removeModal() {
                    document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
                }
                window.addEventListener('click', removeModal);
            }
            catch (ex) { console.log("removeModal error: ", ex); }

        }
    }
)
// try {
//     function removeModal() {
//         document.getElementsByTagName('model-popup').length && document.body.removeChild(document.getElementsByTagName('model-popup')[0]);
//     }
//     window.addEventListener('click', removeModal);
// }
// catch (ex) { console.log("removeModal error: ", ex); }
//}