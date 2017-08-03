import Vue from 'vue';
import Router from 'vue-router';
import Pokedex from '@/components/pokedex';
// import Hello from '@/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: Pokedex,
    },
  ],
});
