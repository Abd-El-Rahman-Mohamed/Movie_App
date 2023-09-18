// Interface Functions //
/////////////////////////
// Focus on current button script --- styling
const actions = document.getElementById("actions");
const actionsChildren = actions.children;

actions.addEventListener("click", (e) => {
  if (e.target.closest("li") == null) return;
  var value = /listLi|addLi|editLi|deleteLi/.test(e.target.closest("li").id);
  if (e.target.tagName !== "LI" && !value) {
    return;
  } else {
    var liId = e.target.closest("li").id;
    const clickedElement = document.querySelector(`#${liId}`);

    const currentActiveElement = document.querySelector(".active");
    if (currentActiveElement === null) {
      clickedElement.setAttribute("class", "active");
    } else {
      currentActiveElement.setAttribute("class", "");
      clickedElement.setAttribute("class", "active");
    }
  }
});

// displayMovies function to display the movies data on the screen
function displayMovies() {
  const article = document.querySelector("article");
  article.innerHTML = "";

  for (let i = 0; i < globalData.length; i++) {
    const actionContainer = document.createElement("section");
    actionContainer.setAttribute("id", `actionContainer-${i + 1}`);

    article.appendChild(actionContainer);

    let movieTitle = globalData[i].title;
    let titleId = movieTitle.split(" ").join("_");
    let movieYear = globalData[i].year;
    let movieDirector = globalData[i].director;
    let moviePoster = globalData[i].poster;
    let movieGenres = globalData[i].genres.join(" 🎥 ");
    let moviePlot = globalData[i].plot;
    let movieCast = globalData[i].cast.join(" 🎭 ");
    let movieRuntime = globalData[i].runtime;

    actionContainer.innerHTML = `
    <h2 id="${titleId}">${movieTitle}</h2>
    <h3 id="${titleId}Year"><span class="deepPink">Year: </span>${movieYear}</h3>
    <h3 id="${titleId}Director"><span class="deepPink">Director: </span>${movieDirector}</h3>
    <img id="${titleId}Poster" src="${moviePoster}" alt="${movieTitle} poster." />
    <p id="${titleId}Genres"><span class="deepPink">Genres: </span>${movieGenres}</p>
    <p id="${titleId}Plot"><span class="deepPink">Plot: </span>${moviePlot}</p>
    <p id="${titleId}Cast"><span class="deepPink">Cast: </span>${movieCast}</p>
    <p id="${titleId}Runtime"><span class="deepPink">Duration: </span>${movieRuntime}</p>
    `;
  }

  window.location.href = "#actionContainer-1";
}

// Display a form to add movie data
var pushForm;
var casts = [];
var genres = [];

function addMovie() {
  const article = document.querySelector("article");
  article.innerHTML = `
  <section id="formAddMovieContainer">
          <h2>Add Movie</h2>
          <form action="index.html" id="pushForm">
            <div>
              <label for="title">Movie Title: </label>
              <input type="text" name="title" id="titleInput" required>
            </div>
            
            <div>
              <label for="year">Movie Year: </label>
              <input type="number" min="1870" max="2025" name="year" id="year" required>
            </div>

            <div>
              <label for="director">Movie Director: </label>
              <input type="text" name="director" id="director" required>
            </div>
            
            <div>
              <label for="poster">Movie Poster URL: </label>
              <input type="URL" name="poster" id="poster" required>
            </div>

            <div id="genresDiv">
              <label for="genres">Add a genre:</label>
                <div id="genresSelectContainer">
                  <select class="genresSelectInput" name="selectGenre1" id="selectGenre1" required>
                    <option value="">Add Movie Genre</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Animation">Animation</option>
                    <option value="Biography">Biography</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Documentry">Documentry</option>
                    <option value="Drama">Drama</option>
                    <option value="Family">Family</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Game-Show">Game-Show</option>
                    <option value="History">History</option>
                    <option value="Horror">Horror</option>
                    <option value="Music">Music</option>
                    <option value="Musical">Musical</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Short">Short</option>
                    <option value="Sport">Sport</option>
                    <option value="Thriller">Thriller</option>
                    <option value="War">War</option>
                    <option value="Wastern">Wastern</option>
                  </select>
                  <button type="button" title="Add a Genre" id="addGenreBtn">➕</button>
                </div>
            </div>

            <div>
              <label for="plot">Movie Plot: </label>
              <input type="text" name="Plot" id="plot" required>
            </div>
            
            <div id="castDiv">
              <label for="cast">Movie cast:</label>
                <div id="castAddContainer">
                  <input type="text" name="cast" id="addCast1" required />
                  <button type="button" title="Add cast" id="addCastBtn">➕</button>
                </div>
            </div>

            <div>
              <label for="duration">Movie Duration <span class="smallText">(in minutes)</span>: </label>
              <input type="number" min="1" max="5220" name="duration" id="duration" return>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
  `;

  const maxYear = document.querySelector("#year");
  maxYear.setAttribute("max", new Date().getFullYear());
  pushForm = document.querySelector("#pushForm");

  // Select control when entering genres to the movie
  addMovieGenreHandler();
  addMovieCastHandler();

  pushForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    for (let i = 1; i < 4; i++) {
      genres.push(document.querySelector(`#selectGenre${i}`).value);
      casts.push(document.querySelector(`#addCast${i}`).value);
    }
  
    moviePOST();
  })

  window.location.href = "#article";
}

// Event Handlers //
////////////////////
// eventHandler for addMoviesGenre button in Add Movie form
function addMovieGenreHandler() {
  let addGenreBtn = document.querySelector("#addGenreBtn");
  const genresSelectContainer = document.querySelector(
    "#genresSelectContainer"
  );

  let countOfSelectGenres = 1;
  addGenreBtn.addEventListener("click", () => {
    const selectGenre = document.querySelector("#selectGenre1");
    if (selectGenre.value == "") {
      alert("Select a genre before adding a new genre");
      return;
    }
    const selectGenreClone = selectGenre.cloneNode(true);

    selectGenreClone.setAttribute("id", `selectGenre${++countOfSelectGenres}`);
    selectGenreClone.setAttribute("name", `selectGenre${countOfSelectGenres}`);
    selectGenreClone.setAttribute("required", "");

    addGenreBtn.remove();
    genresSelectContainer.appendChild(selectGenreClone);
    if (countOfSelectGenres < 3) genresSelectContainer.appendChild(addGenreBtn);
  });
}

// eventHandler for addMoviesCast button in Add Movie form
function addMovieCastHandler() {
  let addCastBtn = document.querySelector("#addCastBtn");
  const castAddContainer = document.querySelector("#castAddContainer");

  let countOfCast = 1;
  addCastBtn.addEventListener("click", () => {
    const addCast = document.querySelector("#addCast1");
    if (addCast.value == "") {
      alert("Enter Cast before adding new cast");
      return;
    }
    const addCastClone = addCast.cloneNode(true);

    addCastClone.setAttribute("id", `addCast${++countOfCast}`);
    addCastClone.setAttribute("name", `addCast${countOfCast}`);
    addCastClone.setAttribute("required", "");

    addCastBtn.remove();
    castAddContainer.appendChild(addCastClone);
    console.log(countOfCast);
    if (countOfCast < 3) castAddContainer.appendChild(addCastBtn);
  }); 
}

// eventHandler for 'List all movies' button in navigation bar //
/////////////////////////////////////////////////////////////////
// eventHandler for Edit movie button in navigation bar
async function editMovies() {
  await moviesGET();
  console.log(article.childElementCount);
}


// GET, POST, PUT, DELETE functions//
/////////////////////////////////////
// GET movies data
let globalData = 0;
const moviesGET = async function () {
  const fetchPromise = await fetch("http://localhost:3001/movies", {
    method: "GET",
    headers: new Headers({ "content-type": "application/json" }),
  });
  const data = await fetchPromise.json();
  globalData = data;
  displayMovies();
};

// POST movie data
const moviePOST = function () {
  const fetchPromise = fetch("http://localhost:3001/movies", {
    method: "POST",
    body: JSON.stringify({
      title: `${document.querySelector("#titleInput").value}`,
      year: `${document.querySelector("#year").value}`,
      director: `${document.querySelector("#director").value}`,
      cast: casts,
      plot: `${document.querySelector("#plot").value}`,
      poster: `${document.querySelector("#poster").value}`,
      genres: genres,
      runtime: `${document.querySelector("#duration").value}`,
    }),
    headers: new Headers({ "content-type": "application/json" }),
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));

  alert("title: ", document.querySelector("#title").value);
};

// Delete Movie function
const movieDELETE = function () {
  const id = "650333a999d4e198eb71f785";
  const fetchPromise = fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));
};

// Edit Movie function
const moviePUT = function () {
  const id = "6503363ecdede7cdbbe3730e";
  const fetchPromise = fetch(`http://localhost:3001/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      plot: "Gayatri, a woman with a degenerative eye disorder, is slowly losing her eyesight. She, however, has to solve the mystery of her twin sister Gautami's death.",
    }),
    headers: new Headers({ "content-type": "application/json" }),
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));
};

/****************** eventListeners *******************/
/********* nav items listeners *********/
// List movies listener
const listLi = document.querySelector("#listLi");
listLi.addEventListener("click", moviesGET);

// Add movie listener
const addLi = document.querySelector("#addLi");
addLi.addEventListener("click", addMovie);

// Edit movie listener
const editLi = document.querySelector("#editLi");
// editLi.addEventListener("click", moviesGET);
editLi.addEventListener("click", editMovies);

// Delete movie listener
const deleteLi = document.querySelector("#deleteLi");
deleteLi.addEventListener("click", movieDELETE);

/********* Adding movie form listener *********/

// ifValidatedThenPush()

