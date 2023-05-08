function searchMovie() {
  let domain = "https://www.omdbapi.com";
  let results = [];

  let movieTitle = document.querySelector(".movie-title-input").value;
  let query = `apikey=${app.apiKey}&s=${movieTitle}&plot=full&page=1`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      results = JSON.parse(xhttp.responseText).Search;
      generatePagination(JSON.parse(xhttp.responseText).totalResults);
      let moviesRow = document.querySelector(".movies-row");
      moviesRow.innerHTML = "";
      results.map((result, key) => {
        let element = document.createElement("div");
        element.classList.add("col-12");
        element.classList.add("col-md-3");
        element.classList.add("movie-poster");
        element.setAttribute("style","text-align:center");
        element.innerHTML = `<div>
        <a href="#" data-toggle="modal" data-target="#modalMovieDetails" alt="${result.Title}" onclick="getMovieDetails('${result.imdbID}')">
          <img src="${result.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded" alt="${result.Title}" value="${result.Title}"/>
        </a>
        </div>
        <div>
        ${result.Title}
        </div>
        <div class="divMovieTrailer">
        <a href="#" class="btn btn-outline-dark btn-play-trailer" data-toggle="modal" data-target="#modalMovieTrailer" onclick="getTrailerVideo('${result.Title}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
          Trailer
        </a>
        </div>
        `;
        moviesRow.appendChild(element);
      });
      document.getElementById("pagination").setAttribute("style", "display:flex");
      document.querySelectorAll(".pagination-number").forEach((button) => {
          button.classList.remove("active");
          const pageIndex = Number(button.getAttribute("page-index"));
          if (pageIndex == 1) {
            button.classList.add("active");
          }
          });
    }else{
      document.getElementById("pagination").setAttribute("style", "display:none")
    }
  };

  xhttp.open("GET", `${domain}?${query}`, true);
  xhttp.send();
}

function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;
  document.querySelector(".date-today").innerHTML = today;
}

function init() {
  getDate();
}
init();


var player;
function stopVideo() {
  let div = document.getElementById('movie-trailer');
  div.innerHTML ="";
  div.innerHTML=`<div id="player" />`
 }

function playThisVideo(videoID){
	player = new YT.Player('player', {
    videoId: videoID,
    playerVars: { 'autoplay': 1, 'controls': 0, 'playsinline': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

}	

function onPlayerReady() {
  console.log(true);
}
 
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

function changePage(page){
  let domain = "https://www.omdbapi.com";
  let results = [];
  
  let movieTitle = document.querySelector(".movie-title-input").value;
  let query = `apikey=${app.apiKey}&s=${movieTitle}&plot=full&page=${page}`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
       results = JSON.parse(xhttp.responseText).Search;

      let moviesRow = document.querySelector(".movies-row");
      moviesRow.innerHTML = "";

      results.map((result, key) => {
        let element = document.createElement("div");
        element.classList.add("col-12");
        element.classList.add("col-md-3");
        element.classList.add("movie-poster");
        element.setAttribute("style","text-align:center");
        // element.innerHTML = `
        // <a href="./movie.html?id=${result.imdbID}" alt="${result.Title}">
        //   <img src="${result.Poster || "./src/assets/movies.jpg"}"
        //   class="img-fluid rounded" alt="${result.Title}" />
        // </a>
        // `;

        element.innerHTML = `<div>
        <a href="#" data-toggle="modal" data-target="#modalMovieDetails" alt="${result.Title}" onclick="getMovieDetails('${result.imdbID}')">
          <img src="${result.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded" alt="${result.Title}" value="${result.Title}"/>
        </a>
        </div>
        <div>
        ${result.Title}
        </div>
        <div class="divMovieTrailer">
        <a href="#" class="btn btn-outline-dark btn-play-trailer" data-toggle="modal" data-target="#modalMovieTrailer" onclick="getTrailerVideo('${result.Title}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
          Trailer
        </a>
        </div>
        `;
        moviesRow.appendChild(element);
      });
    }
    
  };
  xhttp.open("GET", `${domain}?${query}`, true);
  xhttp.send();
}

function generatePagination(totalRecord){
const paginationNumbers = document.getElementById("pagination-numbers");
paginationNumbers.innerHTML = '';
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
let pageCount = 0;
if (totalRecord<=100){
  pageCount  = Math.ceil(totalRecord / paginationLimit);
}
else{
  pageCount = 10;
}
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  pageNumber.setAttribute("onclick", `changePage(${index})`)

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

};


  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
};


$('#modalMovieDetails').on('shown.bs.modal', function () {
  // document.getElementById("modal-body").innerHTML="test";
});



function getTrailerVideo(movieTitle){
  let domain = "https://www.googleapis.com/youtube/v3/search";
  let query = `key=${app.youtubeKey}&type=video&maxResults=1&q=${movieTitle + ' Official Trailer'}`;
  let videoId = "";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let results = JSON.parse(xhttp.responseText).items;
      results.map((result, key) => {
        videoId= result.id.videoId;
      });
      playThisVideo(videoId);
  }
};
  xhttp.open("GET", `${domain}?${query}`, true);
  xhttp.send();
  
}

