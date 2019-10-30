
import { getDetails } from "./api.js";
import { getImagePath } from "./card.js";
import { rating } from "./rating.js";

export function moviePopup(movieId) {

    let AllData = getDetails(movieId);

    let overview = AllData.overview;
    let genres = AllData.genres;

    let movieCast = '';
    let cast = AllData.forEach(element => {
        movieCast += element.credits.cast[0].name + ', ';
    });
    let derector = AllData.credits.crew[0].name;
    let movieRating = rating(AllData.vote_average);

    var modelPopup = `
<button id="popup">Open Modal</button>
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>${AllData.original_title}</h2>
    </div>
    <div class="modal-body">
        <div>
            <figure>
                <img class="card__image" src="${getImagePath(AllData.poster_path)}" role="img">
            </figure>
            <p>${AllData.overview}</p>
        </div>
        <div>
            <p>Genre: ${AllData.genres}</p>
            <p>Cast: ${movieCast}</p>
            <p>Director: ${derector}</p>
            <p>Movie Rating: ${rating(AllData.vote_average)}</p>
        </div>
    </div>
   <!-- <div class="modal-footer">
      <h3>Modal Footer</h3>
    </div>
    -->
  </div>
</div>`;

    var modal = document.getElementById("myModal");
    var popup = document.getElementsByClassName("popup")[0];
    var span = document.getElementsByClassName("close")[0];

    popup.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}