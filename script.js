const pokeContainer = document.getElementById("poke-container");
const pokemonCount = 250;
const searchInput = document.getElementById("poke-input");
const searchBtn = document.getElementById("btn-search");

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const number = pokemon.id.toString().padStart(3, "0");
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name;

  const color = colors[type];
  pokemonEl.style.backgroundColor = `${color}`;

  const weight = pokemon.weight / 10;
  const height = pokemon.height * 10;

  const pokemonInnerHTML = `
        <div class="img-container">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
            </div>
            <div class="poke-info">
                <div class="poke-id">#${number}</div>
                <div class="poke-name">${name}</div>
                <div class="poke-type"> <small>Type: ${type}</small></div>
                <div class="poke-weight"> Height: ${height}cm </div>
                <div class="poke-weight"> Weight: ${weight}kg </div>
            </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(pokemonEl);
};

fetchPokemons();

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const pokemons = document.querySelectorAll(".pokemon");
  const inputData = e.target.value.toLowerCase();

  pokemons.forEach((pokemon) => {
    pokemon.style.display = "block";

    if (!pokemon.innerHTML.toLowerCase().includes(inputData)) {
      pokemon.style.display = "none";
    }
  });
});
