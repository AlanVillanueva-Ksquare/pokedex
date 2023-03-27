//DOM elements
const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const resetButton = document.querySelector(".reset");
const pokeCards = document.querySelectorAll('.pokemon-card')

//List of pokemon to be shown. any number from 1 to 1008 works
const pokemonList = [1, 25, 88, 144, 292, 276, 372, 580, 680, 703, 911, 1008];

const fetchPokemon = async (number) => { //Getting information from api
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemon = await response.json();
  return pokemon;
};

const fillPokemonData = (pokemon,index) => { //Filling in pokemon information in once empty html elements!

  const pokemonName = pokeCards[index].querySelector('.name') //filling name
  pokemonName.innerHTML = `<a href="https://www.wikidex.net/wiki/${pokemon.name}" target="_blank">${capitalizeFirstLetter(pokemon.name)}</a>`;

  const pokemonSprite = pokeCards[index].querySelector('.sprite') //filling sprite
  pokemonSprite.src = pokemon.sprites.front_default;


  const pokemonTypes = pokeCards[index].querySelector('.types') //filling types
  pokemon.types.forEach((type) => {
    const pokemonType = document.createElement("span");
    pokemonType.classList.add(`${type.type.name}`);
    pokemonType.textContent = `${type.type.name}`;
    pokemonTypes.appendChild(pokemonType);
    });

  const pokemonAttack = pokeCards[index].querySelector('.attack') //filing atk
  pokemonAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;

  const pokemonHP = pokeCards[index].querySelector('.hp') //filling hp
  pokemonHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;

  const pokemonDefense = pokeCards[index].querySelector('.defense') //filing defense
  pokemonDefense.textContent = `Defense: ${pokemon.stats[2].base_stat}`;

  const pokemonSpeed = pokeCards[index].querySelector('.speed') //filling speed
  pokemonSpeed.textContent = `Speed: ${pokemon.stats[5].base_stat}`;

  };
  
  const displayPokemonList = async () => { //function to create for the first time the pokedex from the pokedex numbers given in pokemonList
  pokemonList.forEach(async (number,index) => { //for each selected pokemon...
  const pokemon = await fetchPokemon(number); //fetch info
  fillPokemonData(pokemon,index);//fill html
  });
  };
  
  const searchPokemon = async () => { //function to search one pokemon
  container.innerHTML = ""; //deleting all pokemon info since we will show only one
  const pokemonName = searchInput.value.toLowerCase(); //searched pokemon name
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); //fetch pokemon info
  const pokemon = await response.json();
  container.appendChild(pokeCards[pokemonList.indexOf(pokemon.id)]) //give back to html the chosen pokemon info
  };
  
  const resetSearch = () => { //reset button
  container.innerHTML = ""; //eliminate all pokemon info
  searchInput.value = ""; //reset searchbar input
  for (let i =0;i<pokemonList.length;i++){
    container.appendChild(pokeCards[i]) //give back to html all initial pokemon info
  }
  };
  
  searchInput.addEventListener("keydown", (event) => { //get user input and launch event when enter pressed
  if (event.key === "Enter") {
  searchPokemon();
  }
  })

  function capitalizeFirstLetter(string) { //capitalize first letter of pokemon name for aesthetics
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  resetButton.addEventListener("click", resetSearch); //reset button event listener on click

  displayPokemonList(); //first display of pokemon