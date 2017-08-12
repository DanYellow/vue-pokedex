/* eslint-disable no-param-reassign */

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 20;

const store = new Vuex.Store({
  state: {
    pokedex: [],
    filtered: [],
    endLoaded: false,
    isPokedexFiltering: false,
  },
  mutations: {
    fetchPkmn(state, pkmn) {
      state.pokedex = [...state.pokedex, pkmn];
    },
    filteredPkmn(state, filteredDex) {
      state.filtered = filteredDex;
    },
    isPokedexFiltering(state, isPokedexFiltering = true) {
      state.isPokedexFiltering = isPokedexFiltering;
    },
  },
  actions: {
    fetchPkmn({ commit, state, dispatch }, limit = []) {
      state.endLoaded = false;
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

export default store;
