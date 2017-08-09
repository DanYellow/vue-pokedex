import Vue from 'vue';
import Router from 'vue-router';
import Pokedex from '@/components/pokedex';
import PokemonDetails from '@/components/pokemon-details';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: Pokedex,
      children: [{
        path: ':name',
        name: 'pokemon',
        component: PokemonDetails,
        props: true,
      }],
    },
  ],
});
