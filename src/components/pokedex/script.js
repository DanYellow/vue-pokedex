import Pokemon from '@/components/pokemon';
import PokemonDetails from '@/components/pokemon-details';
import SearchBox from '@/components/search-box';

import store from '@/store';

/* eslint-disable */
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}
/* eslint-enable */

const DELAY_SCROLL = 150;

const myComponent = {
  components: {
    pokemon: Pokemon,
    'pkmn-details': PokemonDetails,
    searchbox: SearchBox,
  },
  created() {
    window.addEventListener('scroll', debounce(this.loadMore.bind(this), DELAY_SCROLL));
  },
  data() {
    return {
      state: store.state,
    };
  },
  methods: {
    loadMore() {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowCurrentPosition = windowHeight + window.pageYOffset;

      if ((windowCurrentPosition / docHeight) >= 0.7 && store.state.endLoaded) {

        store.fetchPkmn([
          (store.state.pokedex.length - 0),
          store.state.pokedex.length + 5,
        ]);
      }
    },
  },
  directives: {
    'infinite-scroll': {
      inserted() {
      },
    },
  },
};

export default myComponent;
