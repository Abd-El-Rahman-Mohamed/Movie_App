// Interface Functions //
/////////////////////////
// Focus on current button script --- styling

/* Selecting the ul element */
const actions = document.getElementById("actions");
const actionsChildren = actions.children;

/* Adding the event listener to the ul element */
actions.addEventListener("click", (e) => {
  
  if (e.target.tagName !== "LI" && !e.target.closest("li") ) return;
  else {
    var liId = e.target.closest("li").id;
    const clickedElement = document.querySelector(`#${liId}`);

    const currentActiveElement = document.querySelector(".active");
    if (!currentActiveElement) clickedElement.setAttribute("class", "active");
    else {
      currentActiveElement.removeAttribute("class");
      clickedElement.setAttribute("class", "active");
    }
  }
});

// displayMovies function to display the movies data on the screen
function displayMovies() {
  const article = document.querySelector("article");
  article.innerHTML = "";

  for (let i = 0; i < globalData.length; i++) {

    let movieTitle = globalData[i].title;
    let titleId = movieTitle.split(" ").join("_");
    let movieYear = globalData[i].year;
    let movieDirector = globalData[i].director;
    let moviePoster = globalData[i].poster;
    let movieGenres = globalData[i].genres.join(" 🎥 ");
    let moviePlot = globalData[i].plot;
    let movieCast = globalData[i].cast.join(" 🎭 ");
    let movieRuntime = globalData[i].runtime;

    article.innerHTML += `
    <section id="actionContainer-${i+1}">
      <h2 id="${titleId}">${movieTitle}</h2>
      
      <img id="${titleId}Poster" src="${moviePoster}" alt="${movieTitle} poster." />
      
      <div id="${titleId}YearContainer">
        <h3 id="${titleId}YearTitle" class="deepPink">Year:</h3>
        <p id="${titleId}YearValue">${movieYear}</p>
      </div>

      <div id="${titleId}DirectorContainer">
        <h3 id="${titleId}DirectorTitle" class="deepPink">Director:</h3>
        <p id="${titleId}DirectorValue">${movieDirector}</p>
      </div>

      <div id="${titleId}GenresContainer">
        <h3 id="${titleId}GenresTitle" class="deepPink">Genres:</h3>
        <p id="${titleId}GenresValue">${movieGenres}</p>
      </div>

      <div id="${titleId}PlotContainer">
        <h3 id="${titleId}PlotTitle" class="deepPink">Plot:</h3>
        <p id="${titleId}PlotValue">${moviePlot}</p>
      </div>
      
      <div id="${titleId}CastContainer">
        <h3 id="${titleId}CastTitle" class="deepPink">Cast:</h3>
        <p id="${titleId}CastValue">${movieCast}</p>
      </div>

      <div id="${titleId}RuntimeContainer">
        <h3 id="${titleId}RuntimeTitle" class="deepPink">Duration:</h3>
        <p id="${titleId}RuntimeValue">${movieRuntime} minutes</p>
      </div>
    </section>
    `;
  }

  window.location.href = "#article";
}

// Display a form to add movie data
var pushForm;
var casts = [];
var genres = [];

function POSTorPUTMovie(POSTorPUT = "POST", index) {
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
              <textarea name="Plot" id="plotTextarea" required></textarea>
            </div>
            
            <div id="castDiv">
              <label for="cast">Movie cast:</label>
                <div id="castAddContainer">
                  <input type="text" name="cast" id="addCast1" required />
                  <button type="button" title="Add cast" id="addCastBtn">➕</button>
                </div>
            </div>

            <div>
              <label for="duration">Movie Duration <span class="smallText">(in minutes)</span> : </label>
              <input type="number" min="1" max="5220" name="duration" id="duration" return>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
  `;

  // To set the max for year number input to be the current year
  const maxYear = document.querySelector("#year");
  maxYear.setAttribute("max", new Date().getFullYear());

  // Selecting the form we created
  pushForm = document.querySelector("#pushForm");
  window.location.href = '#article';

  // Select control when entering genres to the movie
  // And add Cast control when entering casts to the movie
  addMovieGenreHandler();
  addMovieCastHandler();

  pushForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const genresN = document.querySelectorAll('[id^="selectGenre"]').length;
    const castsN = document.querySelectorAll('[id^="addCast"]').length;

    if (genresN <= 3) {
      for (let i = 0; i <  document.querySelectorAll(`[id^="selectGenre"]`).length; i++)  {
        if(document.querySelector(`#selectGenre${i+1}`)) genres.push(document.querySelector(`#selectGenre${i+1}`).value);
      }
    }

    if (castsN <= 3) {
      for (let i = 0; i <  document.querySelectorAll(`[id^="addCast"]`).length; i++) {
        if(document.querySelector(`#addCast${i+1}`)) casts.push(document.querySelector(`#addCast${i+1}`).value);
      }
    }
    
    genres = genres.slice(0,3);
    genres = genres.filter(n => n);

    casts = casts.slice(0,3)
    casts = casts.filter(n => n);
  
    if (document.querySelector('#saveBtn')) { 
      moviePUT(index);

      /* Going to the saved section */
      moviesGET();
      window.location.href = `#actionContainer-${index}`;
    }
    else if (!document.querySelector('#saveBtn')) moviePOST();

    pushForm.closest('section').remove();
    document.querySelector('.active').setAttribute('class', '');
    
    return;
  })

  
}

// Event Handlers //
////////////////////
// eventHandler for addMoviesGenre button in Add Movie form
function addMovieGenreHandler() {
  let addGenreBtn = document.querySelector("#addGenreBtn");

  const removeGenreBtn = document.createElement('button');
  removeGenreBtn.textContent = 'X';
  removeGenreBtn.setAttribute('type', 'button');

  const genresSelectContainer = document.querySelector("#genresSelectContainer");

  let countOfSelectGenres = 1;
  const selectGenre = document.querySelector(`#selectGenre${countOfSelectGenres}`);
  addGenreBtn.addEventListener("click", (e) => {
    
    // Alert problem: if (selectGenre.value == "") {
    if( e.target.previousElementSibling ) var value = e.target.previousElementSibling.value; 
    if (!value) {
      alert("Enter a Genre value before adding a new Genre");
      return;
    }
    
    const selectGenreClone = selectGenre.cloneNode(true);
    
    selectGenreClone.setAttribute("id", `selectGenre${++countOfSelectGenres}`);
    selectGenreClone.setAttribute("name", `selectGenre${countOfSelectGenres}`);

    const removeGenreBtnClone = removeGenreBtn.cloneNode(true);
    removeGenreBtnClone.setAttribute("id", `removeGenreBtn${countOfSelectGenres-1}`);
    
    genresSelectContainer.appendChild(removeGenreBtnClone);
    removeGenreBtnClone.addEventListener("click", (e) => {
      if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
        removeGenreBtnClone.remove(); 
        genresSelectContainer.appendChild(addGenreBtn);
        const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
        onlyOneSelectGenre.value = '';
        countOfSelectGenres = 1;
        return;
      }
      if ( e.target.previousElementSibling ) e.target.previousElementSibling.remove();
      removeGenreBtnClone.remove();  
    });
    
    genresSelectContainer.appendChild(selectGenreClone);
    addGenreBtn.remove();
    if (countOfSelectGenres === 3) { 
      const removeGenreBtnClone = removeGenreBtn.cloneNode(true);
      removeGenreBtnClone.setAttribute("id", `removeGenreBtn3`);
      removeGenreBtnClone.addEventListener("click", (e) => {
        if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
          removeGenreBtnClone.remove(); 
          genresSelectContainer.appendChild(addGenreBtn);
          const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
          onlyOneSelectGenre.id = 'selectGenre1';
          onlyOneSelectGenre.value = '';
          countOfSelectGenres = 1;
          return;
        }
        if( e.target.previousElementSibling.tagName === 'SELECT' ) e.target.previousElementSibling.remove();
        if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
          removeGenreBtnClone.remove(); 
          const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
          onlyOneSelectGenre.value = '';
        }
      });
      genresSelectContainer.appendChild(removeGenreBtnClone);
    }
    if ( document.querySelectorAll('select').length < 3 ) genresSelectContainer.appendChild(addGenreBtn); 
  });
}

// eventHandler for addMoviesCast button in Add Movie form
function addMovieCastHandler() {
  let addCastBtn = document.querySelector("#addCastBtn");
  const castAddContainer = document.querySelector("#castAddContainer");

  let countOfCasts = 1;
  const addCast = document.querySelector(`#addCast${countOfCasts}`);

  const removeCastBtn = document.createElement('button');
  removeCastBtn.textContent = 'X';
  removeCastBtn.setAttribute('type', 'button');

  addCastBtn.addEventListener("click", (e) => {

    if( e.target.previousElementSibling ) var value = e.target.previousElementSibling.value; 
    if (!value) {
      alert("Enter a Cast value before adding a new Cast");
      return;
    }
    
    const addCastClone = addCast.cloneNode(true);
    addCastClone.value = '';

    addCastClone.setAttribute("id", `addCast${++countOfCasts}`);
    addCastClone.setAttribute("name", `addCast${countOfCasts}`);

    const removeCastBtnClone = removeCastBtn.cloneNode(true);
    removeCastBtnClone.setAttribute("id", `removeCastBtn${countOfCasts-1}`);
    
    castAddContainer.appendChild(removeCastBtnClone);
    removeCastBtnClone.addEventListener("click", (e) => {
      if (document.querySelectorAll('[id^="addCast"]').length === 1) {
        removeCastBtnClone.remove(); 
        castAddContainer.appendChild(addCastBtn);
        const onlyOneAddCast = document.querySelector('[id^="addCast"]');
        onlyOneAddCast.id = 'addCast1';
        onlyOneAddCast.value = '';
        countOfCasts = 1;
        return;
      }
      if ( e.target.previousElementSibling ) e.target.previousElementSibling.remove();
      removeCastBtnClone.remove();  
    });
    
    castAddContainer.appendChild(addCastClone);
    addCastBtn.remove();
    if (countOfCasts === 3) { 
      const removeCastBtnClone = removeCastBtn.cloneNode(true);
      removeCastBtnClone.setAttribute("id", `removeCastBtn3`);
      removeCastBtnClone.addEventListener("click", (e) => {
        if (document.querySelectorAll('[id^="addCast"]').length === 1) {
          removeCastBtnClone.remove(); 
          castAddContainer.appendChild(addCastBtn);
          const onlyOneAddCast = document.querySelector('[id^="addCast"]');
          onlyOneAddCast.id = 'addCast1';
          onlyOneAddCast.value = '';
          countOfCasts = 1;
          return;
        }
        if ( e.target.previousElementSibling.tagName === 'INPUT' ) e.target.previousElementSibling.remove();
        if (document.querySelectorAll('[id^="addCast"]').length === 1) {
          removeCastBtnClone.remove(); 
          const onlyOneAddCast = document.querySelector('[id^="addCast"]');
          onlyOneAddCast.value = '';
        }
      });
      castAddContainer.appendChild(removeCastBtnClone);
    }
    if (countOfCasts < 3) castAddContainer.appendChild(addCastBtn);
  }); 
}

// eventHandler for 'List all movies' button in navigation bar //
/////////////////////////////////////////////////////////////////
// eventHandler for Edit movie button in navigation bar
async function editMovies() {
  await moviesGET();
  if(!document.querySelector('#actionContainer-1')) {
    alert('There Is No Movies to Edit.');
    const editLi = document.querySelector('.active');
    editLi.removeAttribute('class');
  } 
  const sectionsNumber = article.childElementCount;
  for ( let i = 1; i <= sectionsNumber; i++ ) {
    const currentSectionHeading = document.querySelector(`#actionContainer-${i} h2`);

    const editIconBtn = document.createElement('button');
    editIconBtn.setAttribute('id', `editIconBtn-${i}`);
    editIconBtn.setAttribute('class', 'shakeMe moveMe');
    editIconBtn.textContent = '✍🏻';
    currentSectionHeading.appendChild(editIconBtn);

    editIconBtn.addEventListener('click', async (e) => {
      const clickedSection = e.target.closest("section");
      const clickedSectionId = clickedSection.id;
      
      const index = Number(clickedSectionId.slice(clickedSectionId.indexOf('-')+1));


      const titleValue = document.querySelector(`#${clickedSection.id} h2`).textContent;
      const yearValue = document.querySelector(`#${clickedSection.id} [id$="YearValue"]`).textContent;
      const directorValue = document.querySelector(`#${clickedSection.id} [id$="DirectorValue"]`).textContent;
      const posterURLValue = document.querySelector(`#${clickedSection.id} [id$="Poster"]`).src;
      const genres = document.querySelector(`#${clickedSection.id} [id$="GenresValue"]`).textContent.split(' 🎥 ');
      const genresN = genres.length;
      const plotValue = document.querySelector(`#${clickedSection.id} [id$="PlotValue"]`).textContent;
      const casts = document.querySelector(`#${clickedSection.id} [id$="CastValue"]`).textContent.split(' 🎭 ');
      const castsN = casts.length;
      const durationValue = document.querySelector(`#${clickedSection.id} [id$="RuntimeValue"]`).textContent;
      
      
      POSTorPUTMovie("PUT", index);
      window.location.href = '#formAddMovieContainer';

      const h2 = document.querySelector('h2');
      h2.textContent = 'Edit Movies';


      const addGenreBtn = document.querySelector('#addGenreBtn');
      const addCastBtn = document.querySelector('#addCastBtn');

      const saveBtn = document.querySelector('[type="submit"]');
      saveBtn.setAttribute('id', 'saveBtn');
      saveBtn.textContent = 'Save';

      const selectorsContainer = document.querySelector('#genresSelectContainer');
      const templateGenreSelector = document.querySelector('#selectGenre1');
      
      const castsContainer = document.querySelector('#castAddContainer');
      const templateCastAdder = document.querySelector('#addCast1');

      // Rendering the title value
      const titleInput = document.querySelector('#titleInput');
      titleInput.value=`${titleValue.slice(0, titleValue.length-3)}`;
      
      // Rendering the year value
      const yearInput = document.querySelector('#year');
      yearInput.value= Number(yearValue);
      
      // Rendering the director value
      const directorInput = document.querySelector('#director');
      directorInput.value=`${directorValue}`;
      
      // Rendering the poster value
      const posterInput = document.querySelector('#poster');
      posterInput.value=`${posterURLValue}`;
      
      // addMovieGenreHandler();
      // Rendering the genres value
      for ( let i = 0; i < genresN; i++) {
        const genreSelector = templateGenreSelector.cloneNode(true);
        genreSelector.setAttribute('id', `selectGenre${i+1}`);
        genreSelector.setAttribute('name', `selectGenre${i+1}`);
        genreSelector.value = genres[i];
        
        templateGenreSelector.remove();
        selectorsContainer.appendChild(genreSelector);
        selectorsContainer.appendChild(addGenreBtn)
        if( document.querySelector(`selectGenre${i-1}`) !== 'BUTTON' ) {

          const removeGenreBtn = document.createElement(`button`);
          removeGenreBtn.setAttribute('id', `removeGenreBtn${i+1}`);
          removeGenreBtn.textContent = 'X';

          removeGenreBtn.addEventListener("click", (e) => {
            if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
              removeGenreBtn.remove(); 
              genresSelectContainer.appendChild(addGenreBtn);
              const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
              onlyOneSelectGenre.value = '';
              countOfSelectGenres = 1;
              return;
            }
            document.querySelector(`#selectGenre${e.target.id.slice(-1)}`).remove();
            removeGenreBtn.remove();  
          });
          if( (i+1) === 3 ) { 
            const removeGenreBtnClone = removeGenreBtn.cloneNode(true);
            removeGenreBtnClone.addEventListener("click", (e) => {
              if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
                removeGenreBtnClone.remove(); 
                const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
                onlyOneSelectGenre.id = 'selectGenre1';
                onlyOneSelectGenre.value = '';
                countOfSelectGenres = 1;
                return;
              }
              document.querySelector(`#selectGenre${e.target.id.slice(-1)}`).remove();
              removeGenreBtnClone.remove();
              if (document.querySelectorAll('[id^="selectGenre"]').length === 1) {
                removeGenreBtnClone.remove(); 
                genresSelectContainer.appendChild(addGenreBtn);
                const onlyOneSelectGenre = document.querySelector('[id^="selectGenre"]');
                onlyOneSelectGenre.value = '';
              }
            });
            // genresSelectContainer.appendChild(removeGenreBtnClone);
          }

          selectorsContainer.appendChild(removeGenreBtn);
        }
        if (document.querySelectorAll('[id^="selectGenre"]').length === genresN) addGenreBtn.remove();
      }
      
      // Rendering the plot value
      const plotInput = document.querySelector('#plotTextarea');
      plotInput.value=`${plotValue}`;


      // Rendering the casts value
      // addMovieCastHandler();
      // for ( let i = 0; i < castsN; i++) {
      //   const castInput = templateCastAdder.cloneNode(true);
      //   castInput.setAttribute('id', `addCast${i+1}`);
      //   castInput.setAttribute('name', `cast${i+1}`);
      //   castInput.value = casts[i];
        
      //   templateCastAdder.remove();
      //   addCastBtn.remove()
      //   castsContainer.appendChild(castInput);
      //   // if(castsContainer.contains(addCastBtn)) castsContainer.removeChild(addCastBtn);
      //   if (document.querySelectorAll('[id^="addCast"]').length < 3) castsContainer.appendChild(addCastBtn);
      // }

      for ( let i = 0; i < castsN; i++) {
        const castAdder = templateCastAdder.cloneNode(true);
        castAdder.setAttribute('id', `addCast${i+1}`);
        castAdder.setAttribute('name', `addCast${i+1}`);
        castAdder.value = casts[i];
        
        templateCastAdder.remove();
        castsContainer.appendChild(castAdder);
        castsContainer.appendChild(addCastBtn)
        if( document.querySelector(`addCast${i-1}`) !== 'BUTTON' ) {

          const removeCastBtn = document.createElement(`button`);
          removeCastBtn.setAttribute('id', `removeCastBtn${i+1}`);
          removeCastBtn.textContent = 'X';

          removeCastBtn.addEventListener("click", (e) => {
            if (document.querySelectorAll('[id^="addCast"]').length === 1) {
              removeCastBtn.remove(); 
              castsContainer.appendChild(addCastBtn);
              const onlyOneAddCast = document.querySelector('[id^="addCast"]');
              onlyOneAddCast.value = '';
              countOfCasts = 1;
              return;
            }
            document.querySelector(`#addCast${e.target.id.slice(-1)}`).remove();
            removeCastBtn.remove();  
          });
          if( (i+1) === 3 ) { 
            const removeCastBtnClone = removeCastBtn.cloneNode(true);
            removeCastBtnClone.addEventListener("click", (e) => {
              if (document.querySelectorAll('[id^="addCast"]').length === 1) {
                removeCastBtnClone.remove(); 
                const onlyOneAddCast = document.querySelector('[id^="addCast"]');
                onlyOneAddCast.id = 'addCast1';
                onlyOneAddCast.value = '';
                countOfCasts = 1;
                return;
              }
              document.querySelector(`#addCast${e.target.id.slice(-1)}`).remove();
              removeCastBtnClone.remove();
              if (document.querySelectorAll('[id^="addCast"]').length === 1) {
                removeCastBtnClone.remove(); 
                
                const onlyOneAddCast = document.querySelector('[id^="addCast"]');
                onlyOneAddCast.value = '';
              }
            });
            // genresSelectContainer.appendChild(removeGenreBtnClone);
          }

          castsContainer.appendChild(removeCastBtn);
        }
        if (document.querySelectorAll('[id^="addCast"]').length-1 === 3) addCastBtn.remove() 
      }
      //This is the end of the for loop

      // Rendering the duration value
      const durationInput = document.querySelector('#duration');
      durationInput.value = Number(durationValue.slice('0', durationValue.indexOf(' ')));
    }
    );
  }
  
}

async function deleteMovies() {
  await moviesGET();
  if(!document.querySelector('#actionContainer-1')) {
    alert('There Is No Movies to Delete.');
    const deleteLi = document.querySelector('.active');
    deleteLi.removeAttribute('class');
  } 
  const sectionsNumber = article.childElementCount;
  for ( let i = 1; i <= sectionsNumber; i++ ) {
    const currentSectionHeading = document.querySelector(`#actionContainer-${i} h2`);
    // I thinks it's a dead code: console.log(`${i}: ${currentSectionHeading.textContent}`);
    const deleteIconBtn = document.createElement('button'); 
    deleteIconBtn.setAttribute('id', `deleteIconBtn-${i}`); 
    deleteIconBtn.setAttribute('class', 'shakeMe moveMe blackTextShadow'); 
    deleteIconBtn.textContent = '❌'; 
    currentSectionHeading.appendChild(deleteIconBtn); 
  
    deleteIconBtn.addEventListener('click', async (e) => { // editIconBtn
      const clickedSection = e.target.closest("section");
      console.log(clickedSection)
      const clickedSectionId = clickedSection.id;
      
      const index = Number(clickedSectionId.slice(clickedSectionId.indexOf('-')+1));
      console.log(index);

      movieDELETE(index);

      clickedSection.remove();

      window.href.reload();
    });
  }
}



// GET, POST, PUT, DELETE functions//
/////////////////////////////////////
// GET movies data
var globalData;
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
      plot: `${document.querySelector("#plotTextarea").value}`,
      poster: `${document.querySelector("#poster").value}`,
      genres: genres,
      runtime: `${document.querySelector("#duration").value}`,
    }),
    headers: new Headers({ "content-type": "application/json" }),
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));

  displayMovies();

  const article = document.querySelector('#article');
  const linkToLastChild = article.lastChild.id;
  window.location.href = linkToLastChild;
};

// Delete Movie function
const movieDELETE = function (index) {
  index--;
  console.log('index in movieDELETE: ', index);
  const fetchPromise = fetch(`http://localhost:3001/movies/index/${index}`, {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));
};

// Edit Movie function
const moviePUT = function (index) {
  fetchURL = `http://localhost:3001/movies/index/${String(index-1)}`;
  const fetchPromise = fetch(fetchURL, {
    mode: 'cors',
    method: "PUT",
    body: JSON.stringify({
      title: `${document.querySelector("#titleInput").value}`,
      year: `${document.querySelector("#year").value}`,
      director: `${document.querySelector("#director").value}`,
      cast: casts,
      plot: `${document.querySelector("#plotTextarea").value}`,
      poster: `${document.querySelector("#poster").value}`,
      genres: genres,
      runtime: `${document.querySelector("#duration").value}`,
    }),
    // headers: {new Headers({ "content-type": "application/json" }), {'Access-Control-Allow-Origin': '*'}}
    headers: {
       "content-type": "application/json",
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": ("PUT, GET, POST"),
       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      }
  });
  fetchPromise.catch((error) => console.log("ERROR: ", error));
};

/********* nav items listeners *********/
// List movies listener
const listLi = document.querySelector("#listLi");
listLi.addEventListener("click", moviesGET);

// Add movie listener
const addLi = document.querySelector("#addLi");
addLi.addEventListener("click", POSTorPUTMovie);

// Edit movie listener
const editLi = document.querySelector("#editLi");
editLi.addEventListener("click", editMovies);

// Delete movie listener
const deleteLi = document.querySelector("#deleteLi");
deleteLi.addEventListener("click", deleteMovies);