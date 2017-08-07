const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 15;

const store = {
  state: {
    pokedex: [],
    filtered: [],
  },
  addPokemon(pkmn) {
    this.state.pokedex.push(pkmn);
  },
  setPokedex(filteredPokedex) {
    // this.state.pokedex = filteredPokedex;
    this.state.filtered = filteredPokedex;
  },
};

const fetchPkmn = (limit = []) => {
  let pkmnIndex = limit[0];
  fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then(result =>
    result.json(),
  ).then((pkmn) => {
    if (limit[0] > limit[1]) { return; }
    store.addPokemon(pkmn);
    pkmnIndex += 1;
    fetchPkmn([pkmnIndex, limit[1]]);
  });
};

fetchPkmn([1, MAX_ID]);

export default store;
