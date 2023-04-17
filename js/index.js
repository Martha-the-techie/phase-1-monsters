const monsterContainer = document.querySelector("#monster-container");
const createMonsterForm = document.querySelector("#create-monster-form");
const baseUrl = "http://localhost:3000/monsters";
let currentPage = 1;

function fetchMonsters() {
  fetch(`${baseUrl}?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(monsters => {
      monsters.forEach(monster => {
        renderMonster(monster);
      });
    });
}

function renderMonster(monster) {
  const monsterCard = document.createElement("div");
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
  `;
  monsterContainer.appendChild(monsterCard);
}

function createMonster(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const age = event.target.age.value;
  const description = event.target.description.value;
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ name, age, description })
  })
    .then(response => response.json())
    .then(monster => {
      renderMonster(monster);
      event.target.reset();
    });
}

function loadMoreMonsters() {
  currentPage++;
  fetchMonsters();
}

createMonsterForm.addEventListener("submit", createMonster);
document.querySelector("#load-monsters").addEventListener("click", loadMoreMonsters);
fetchMonsters();
