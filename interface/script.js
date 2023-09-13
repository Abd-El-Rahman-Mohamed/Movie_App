const actions = document.getElementById("actions");
const actionsChildren = actions.children;

actions.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const clickedId = e.target.id;
  const clickedElement = document.querySelector(`#${clickedId}`);

  const currentActiveElement = document.querySelector(".active");
  if (currentActiveElement === null) {
    clickedElement.setAttribute("class", "active");
  } else {
    currentActiveElement.setAttribute("class", "");
    clickedElement.setAttribute("class", "active");
  }
});


const listMovies = function () {
    fetch('http://localhost:3001/movies', {
        mode: 'no-cors',
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "Access-Control-Allow-Headers": "*",
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data) });
}

const listForm = document.querySelector('#listForm');
listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert('not refreshed');
    listMovies();
});