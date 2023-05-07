function searchMovie() {
  let domain = "https://www.omdbapi.com";
  let results = [];

  let movieTitle = document.querySelector(".movie-title-input").value;
  let query = `apikey=${app.apiKey}&s=${movieTitle}&plot=full&page=1`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let results = JSON.parse(xhttp.responseText).Search;
      generatePagination(JSON.parse(xhttp.responseText).totalResults);
      let moviesRow = document.querySelector(".movies-row");
      moviesRow.innerHTML = "";
      results.map((result, key) => {
        let element = document.createElement("div");
        element.classList.add("col-12");
        element.classList.add("col-md-3");
        element.innerHTML = `
        <a href="./movie.html?id=${result.imdbID}" alt="${result.Title}" >
          <img src="${result.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded" alt="${result.Title}" value="${result.Title}"  onmouseover="playThisVideo('C0BMx-qxsP4','${result.imdbID}')" onmouseout="stopVideo('${result.imdbID}')"  />
        </a>
        <div id="div${result.imdbID}" style="display:flex">
            <div id="iframe${result.imdbID}" />
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
function stopVideo(imdbID) {
  let div = document.getElementById('div' + imdbID);
  div.innerHTML ="";
  div.innerHTML=`<div id="iframe${imdbID}" />`
 }

function playThisVideo(videoId, imdbID){
  document.getElementById('iframe' + imdbID).setAttribute("style","display:block");
	player = new YT.Player('iframe' +imdbID, {
    videoId: videoId,
    playerVars: { 'autoplay': 1, 'controls': 0, 'playsinline': 0 },
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

  let movieTitle = document.querySelector(".movie-title-input").value;
  let query = `apikey=${app.apiKey}&s=${movieTitle}&plot=full&page=${page}`;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let results = JSON.parse(xhttp.responseText).Search;

      let moviesRow = document.querySelector(".movies-row");
      moviesRow.innerHTML = "";

      results.map((result, key) => {
        let element = document.createElement("div");
        element.classList.add("col-12");
        element.classList.add("col-md-3");
        element.innerHTML = `
        <a href="./movie.html?id=${result.imdbID}" alt="${result.Title}">
          <img src="${result.Poster || "./src/assets/movies.jpg"}"
          class="img-fluid rounded" alt="${result.Title}" />
        </a>
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
