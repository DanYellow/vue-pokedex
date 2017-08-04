import Vue from 'vue';
import Router from 'vue-router';
import Pokedex from '@/components/pokedex';
import Pokemon from '@/components/pokemon';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: Pokedex,
      children: [{
        path: ':id',
        component: Pokemon,
        name: 'pokemon',
        props: true,
      }],
    },
  ],
});
