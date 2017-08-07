const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 50;

const store = {
  state: {
    pokedex: [],
    filtered: [],
    endLoaded: false,
  },
  fetchPkmn(limit = []) {
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

// const fetchPkmn = (limit = []) => {
//   let pkmnIndex = limit[0];
//   fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then(result =>
//     result.json(),
//   ).then((pkmn) => {
//     if (limit[0] > limit[1]) {
//       this.
//       return;
//     }
//     store.addPokemon(pkmn);
//     pkmnIndex += 1;
//     fetchPkmn([pkmnIndex, limit[1]]);
//   });
// };

store.fetchPkmn([1, MAX_ID]);

export default store;
