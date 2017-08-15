import Vue from 'vue';
import moxios from 'moxios';
import axios from 'axios';

import store from '@/store';
import mockResponse from '@/bulbasaur.mock.json';

import Pokedex from '@/components/search-box';

describe('Pokedex.vue', () => {
  const Constructor = Vue.extend(Pokedex);
  const PokedexComponent = new Constructor({ store }).$mount();

  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(() => {
      // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('has a created hook', () => {
    expect(typeof Pokedex.created).to.equal('function');
  });

  it('has a created hook', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse,
      }).then((pkmn) => {
        /* eslint-disable */
        console.log('f', PokedexComponent.$el, pkmn);
        done();
      });
    });
  });

  it('has zero pokemon', () => {
    const pokedex = PokedexComponent.$el.querySelector('.pokedex');
    expect(pokedex).equal(null);
  });
});
