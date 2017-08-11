import Pokemon from '@/components/pokemon';
import PokemonDetails from '@/components/pokemon-details';
import SearchBox from '@/components/search-box';
import Loader from '@/components/loader';

import store from '@/store';

/* eslint-disable */
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}
/* eslint-enable */

const DELAY_SCROLL = 150;
const SCROLL_THRESHOLD = 0.85;

const myComponent = {
  components: {
    pokemon: Pokemon,
    'pkmn-details': PokemonDetails,
    searchbox: SearchBox,
    loader: Loader,
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

      console.log('store.state.isFilterEnabled', store.state.isFilterEnabled);
      if ((windowCurrentPosition / docHeight) >= SCROLL_THRESHOLD && store.state.endLoaded && !store.state.isFilterEnabled) {
        store.state.endLoaded = false;
        const pokedexLength = store.state.pokedex.length;
        store.fetchPkmn([
          pokedexLength + 1,
          pokedexLength + 10,
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
