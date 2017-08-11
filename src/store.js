const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 80;

const store = {
  state: {
    pokedex: [],
    filtered: [],
    endLoaded: false,
    isFilterEnabled: false,
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
    }).catch(() => {
      // this.fetchPkmn([pkmnIndex, limit[1]]);
    });
  },
  addPokemon(pkmn) {
    this.state.pokedex.push(pkmn);
  },
  setPokedex(filteredPokedex) {
    this.state.filtered = filteredPokedex;
  },
  toggleInfiniteScroll(canInfinite) {
    this.state.isFilterEnabled = canInfinite;
    if (!this.state.isFilterEnabled) {
      this.state.endLoaded = true;
    }
  },
};

store.fetchPkmn([1, MAX_ID]);

export default store;
