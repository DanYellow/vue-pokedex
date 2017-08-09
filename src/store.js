// const Pokedex = require('pokeapi-js-wrapper');

const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 26;
// const P = new Pokedex.Pokedex();

const store = {
  state: {
    pokedex: [],
    filtered: [],
    endLoaded: false,
  },
  fetchPkmn(limit = []) {
    // P.getPokemonById(5) // with Promise
    // .then((response) => {
    //   console.log(response, limit);
    // });


    let pkmnIndex = limit[0];
    fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then(result =>
      result.json(),
    ).then((pkmn) => {
      if (limit[0] > limit[1]) {
        this.state.endLoaded = true;
        return;
      }
      this.addPokemon(pkmn);
      pkmnIndex += 1;
      this.fetchPkmn([pkmnIndex, limit[1]]);
    });
  },
  addPokemon(pkmn) {
    this.state.pokedex.push(pkmn);
  },
  setPokedex(filteredPokedex) {
    this.state.filtered = filteredPokedex;
  },
};

store.fetchPkmn([1, MAX_ID]);

export default store;
