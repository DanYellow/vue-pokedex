/* eslint-disable no-param-reassign */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 10;

const store = new Vuex.Store({
  state: {
    pokedex: [],
    filtered: [],
    endLoaded: false,
    isFilterEnabled: false,
  },
  mutations: {
    fetchPkmn(state, pkmn) {
      state.pokedex = [...state.pokedex, pkmn];
      // state.pokedex.push(pkmn);
    },
  },
  actions: {
    fetchPkmn({ commit, state, dispatch }, limit = []) {
      let pkmnIndex = limit[0];
      fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then(result =>
        result.json(),
      ).then((pkmn) => {
        if (limit[0] > limit[1]) {
          state.endLoaded = true;
          return;
        }

        commit('fetchPkmn', pkmn);
        pkmnIndex += 1;
        store.dispatch('fetchPkmn', [pkmnIndex, limit[1]]);
      }).catch(() => {
        store.dispatch('fetchPkmn', [pkmnIndex, limit[1]]);
      });
    },
  },
});

store.dispatch('fetchPkmn', [1, MAX_ID]);

// const store = {
//   state: {
    // pokedex: [],
    // filtered: [],
    // endLoaded: false,
    // isFilterEnabled: false,
//   },
  // fetchPkmn(limit = []) {
  //   let pkmnIndex = limit[0];
  //   fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then(result =>
  //     result.json(),
  //   ).then((pkmn) => {
  //     if (limit[0] > limit[1]) {
  //       this.state.endLoaded = true;
  //       return;
  //     }
  //     this.addPokemon(pkmn);
  //     pkmnIndex += 1;
  //     this.fetchPkmn([pkmnIndex, limit[1]]);
  //   }).catch(() => {
  //     // this.fetchPkmn([pkmnIndex, limit[1]]);
  //   });
  // },
//   addPokemon(pkmn) {
//     this.state.pokedex.push(pkmn);
//   },
//   setPokedex(filteredPokedex) {
//     this.state.filtered = filteredPokedex;
//   },
//   toggleInfiniteScroll(canInfinite) {
//     this.state.isFilterEnabled = canInfinite;
//     if (!this.state.isFilterEnabled) {
//       this.state.endLoaded = true;
//     }
//   },
// };

export default store;
