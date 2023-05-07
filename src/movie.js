function getMovieDetails() {
  let url = new URL(location.href);
  let params = new URLSearchParams(url.search);

  let domain = "https://www.omdbapi.com";
  let results = [];

  let query = `apikey=${app.apiKey}&i=${params.get("id")}`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText));
      let res = JSON.parse(xhttp.responseText);

      let movieDetails = document.querySelector(".movie-details");
      let element = document.createElement("div");

      element.classList.add("col-12");
      element.innerHTML = `<div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-3">
          <img src="${res.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title fs-2">
              ${res.Title}
              <span class="badge bg-primary fs-6">${res.imdbRating}</span>
            </h5>
            <div class="row">
              <div class="col-12 mb-3">
                <p class="card-text">${res.Plot}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">ACTORS</p>
                <p class="card-text">${res.Actors}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">DIRECTOR</p>
                <p class="card-text">${res.Director}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">COUNTRY</p>
                <p class="card-text">${res.Country}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">RELEASED</p>
                <p class="card-text">${res.Released}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">GENRE</p>
                <p class="card-text">${res.Genre}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">LANGUAGE</p>
                <p class="card-text">${res.Language}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="card-text fw-bold">RUNTIME</p>
                <p class="card-text">${res.Runtime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      movieDetails.appendChild(element);
    }
  };

  xhttp.open("GET", `${domain}?${query}`, true);
  xhttp.send();
}

function init() {
  getMovieDetails();
}

init();
