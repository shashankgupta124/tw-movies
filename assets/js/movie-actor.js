import { fun } from './common-function/commonFunction.js';
import { VARIABLES } from './common-function/commonVariables.js';
import { api } from './common-function/movies-api.js';

// bind Actor Template
fun.bindTemplate('#actorTemp', '.actor-details', 'movie-actor');
let actor_Card = fun.querry(".actor-details");

const ACTOR_ID = fun.searchParam('id');
let allActorData = [api.getActor(ACTOR_ID), api.getFilmography(ACTOR_ID)];

Promise.all(allActorData).then(response => {
    let actorData = response.shift(), filmographyData = response.shift();
    let actor = {
        getActor: () => {
            try {
                // bind actor info
                actor_Card.querySelector('.actor__image').src = actorData.profile_path ? VARIABLES.IMG_PATH + actorData.profile_path : 'assets/img/No-image.jpg';
                fun.createText(actor_Card, '.actor__heading', actorData.name);
                fun.createText(actor_Card, '.actor__biography', actorData.biography);
                fun.createText(actor_Card, '.actor__content__popularity--rating', actorData.popularity ? Math.round(actorData.popularity) : '1');

                if (actorData.birthday != null && actorData.birthday != "") {
                    fun.createText(actor_Card, '.actor__dob', `Date of birth: ${actorData.birthday}`);
                }
            }
            catch (ex) { console.log("Movie-Actor error: ", ex) }
        },
        getFilmography: () => {
            try {
                // method for finding all unique year
                let yearArray = [], uniqueSet = new Set();
                filmographyData.cast.map(value => {
                    let year = new Date(value.release_date).getFullYear();
                    !Number.isNaN(year) ? uniqueSet.add(year) : '';
                });
                yearArray = [...uniqueSet].sort().reverse();
                console.log("yearArray: ", yearArray);

                let filmography = fun.querry(".filmography");
                let filmography__card = fun.querry(".filmography__card");
                let film__list = fun.querry(".film__list_card");

                // bind filmography
                yearArray.map(uniqueYear => {
                    let cloneHeading = document.importNode(filmography__card.content, true);
                    cloneHeading.querySelector(".filmography__film--heading").textContent = uniqueYear;
                    filmography.appendChild(cloneHeading);

                    filmographyData.cast.map(item => {
                        let year = new Date(item.release_date).getFullYear();
                        if (uniqueYear == year) {

                            let film_year = document.importNode(film__list.content.querySelectorAll(".filmography__film--year")[0], true);
                            film_year.querySelector(".film-title").textContent = item.title;
                            film_year.querySelector(".film-year").textContent = item.release_date;
                            film_year.querySelector(".film-character").textContent = item.character != "" ? item.character : 'Details not provided by supplier!';

                            let ele = filmography.querySelectorAll(".filmography__film__list").length;
                            filmography.querySelectorAll(".filmography__film__list")[ele - 1].appendChild(film_year);
                        }
                    });
                });
            }
            catch (ex) { console.log("Movie-Actor error: ", ex) }
        }
    }
    actor.getActor(), actor.getFilmography();
});