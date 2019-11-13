import { fun } from './commonFunction.js';
import { VARIABLES } from './commonVariables.js';
import { api } from './movies-api.js';

const ACTOR_ID = new URLSearchParams(window.location.search).get('id');

//api.getActor(ACTOR_ID).then(actor =>{  })
let allActorData = [];
allActorData.push( api.getActor(ACTOR_ID), api.getFilmography(ACTOR_ID)
);

Promise.all(allActorData).then(response => {
    try {
        let actorData = response.shift();
        let actorFilmography = response.shift();

        let section = document.querySelector(".actor-details");
        section.querySelector('.detail__image').src = VARIABLES.IMG_PATH + actorData.profile_path;
        section.querySelector('.detail__heading').textContent = actorData.name;
        section.querySelector('.birthday').textContent= actorData.birthday;
        section.querySelector('.biography').textContent =actorData.biography;
        section.querySelector('.popularity_meter').textContent = Math.round(actorData.popularity);
        
    }
    catch (ex) { console.log("Movie-Actor error: ", ex) }
})