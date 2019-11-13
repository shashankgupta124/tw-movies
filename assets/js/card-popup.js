"use strict";

// PopUp custom element
export function customElement() {
    customElements.define("model-popup",
        class MoviePopUp extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                try {
                    // Bring in the import content.
                    var link = document.querySelector('link#quick-view');
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
}