import { fun } from '../common-function/commonFunction.js';
import { VARIABLES } from '../common-function/commonVariables.js';
import { api } from '../common-function/movies-api.js';

// bind Actor Template
fun.bindTemplate('link#actorTemp', '.actor-details', 'movie-actor');
let actor_Card = document.querySelectorAll(".actor-details")[0];

const ACTOR_ID = fun.searchParam('id');
let allActorData = [api.getActor(ACTOR_ID), api.getFilmography(ACTOR_ID)];

Promise.all(allActorData).then(response => {
    let actorData = response.shift(), filmographyData = response.shift();
    let actor = {
        getActor: function () {
            try {
                // bind actor info
                actor_Card.querySelector('.actor__image').src = VARIABLES.IMG_PATH + actorData.profile_path;
                fun.createText(actor_Card, '.actor__heading', actorData.name);
                fun.createText(actor_Card, '.actor__biography', actorData.biography);
                fun.createText(actor_Card, '.actor__content__popularity--rating', Math.round(actorData.popularity));

                if (actorData.birthday != null && actorData.birthday != "") {
                    fun.createText(actor_Card, '.actor__dob', `Date of birth: ${actorData.birthday}`);
                }
            }
            catch (ex) { console.log("Movie-Actor error: ", ex) }
        },
        getFilmography: function () {
            try {
                // method for finding all unique year
                let yearArray = [], uniqueSet = new Set();
                filmographyData.cast.map(value => {
                    let year = new Date(value.release_date).getFullYear();
                    !Number.isNaN(year) ? uniqueSet.add(year) : '';
                });
                yearArray = [...uniqueSet].sort().reverse();
                console.log("yearArray: ", yearArray);





                let filmography = document.querySelector(".filmography");

                let filmography__card = document.getElementById("filmography__card");
                let cloneHeading = document.importNode(filmography__card.content, true);

                let film__list = document.getElementById("film__list_card");
                let cloneFilm__list = document.importNode(film__list.content, true);






                let template = document.getElementById("filmography__card");
                let film = template.content.querySelector(".filmography__film");
                let film_card = document.importNode(film, true);

                // bind actor filmography details

                let filmography_Card = document.querySelector(".filmography__film");
                let film_list = document.querySelector(".filmography__film__list");
                let year_list = document.querySelector(".filmography__film--year");

                yearArray.map(uniqueYear => {
                    cloneHeading.querySelector(".filmography__film--heading").textContent = uniqueYear;
                    filmography.appendChild(cloneHeading);

                    filmographyData.cast.map(item => {
                        //let heading = filmography_Card.querySelector('.filmography__film--heading').appendChild(document.createTextNode(uniqueYear));
                        //let heading = fun.createTextNode(filmography_Card, '.filmography__film--heading', uniqueYear);
                        let year = new Date(item.release_date).getFullYear();

                        if (uniqueYear == year) {

                            //fun.createText(actor_Card, '.actor__biography', actorData.biography);
                            cloneFilm__list.querySelector(".film-title").textContent = item.title;
                            cloneFilm__list.querySelector(".film-year").textContent = item.release_date;
                            cloneFilm__list.querySelector(".film-character").textContent = item.character;
                            filmography.querySelector('.filmography__film--year')
                            // = fun.createTextNode(year_list, '.film-title', item.title);
                            // let release_date = fun.createTextNode(year_list, '.film-year', item.release_date);
                            // let character = fun.createTextNode(year_list, '.film-character', item.character);

                           // film_list.appendChild(year_list);
                        }
                    });
                    filmography_Card.appendChild(heading);
                });
            }
            catch (ex) { console.log("Movie-Actor error: ", ex) }
        }
    }
    actor.getActor();
    actor.getFilmography();
});