import Pokemon from '@/components/pokemon';
import PokemonDetails from '@/components/pokemon-details';
import SearchBox from '@/components/search-box';
import Loader from '@/components/loader';

/* eslint-disable */
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}
/* eslint-enable */

const DELAY_SCROLL = 150;
const SCROLL_THRESHOLD = 0.85;

const body = document.body;
const html = document.documentElement;

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
  methods: {
    loadMore() {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowCurrentPosition = windowHeight + window.pageYOffset;
      const hasReachScrollThreshold = (windowCurrentPosition / docHeight) >= SCROLL_THRESHOLD;
      const { endLoaded, isPokedexFiltering } = this.$store.state;

      if (hasReachScrollThreshold && endLoaded && !isPokedexFiltering) {
        this.$store.state.endLoaded = false;
        const pokedexLength = this.$store.getters.pokedex.length;
        this.$store.dispatch('fetchPkmn', [
          pokedexLength + 1,
          pokedexLength + 10,
        ]);
      }
    },
  },
  computed: {
    pokedex() {
      return this.$store.getters.pokedex;
    },
    endLoaded() {
      return this.$store.state.endLoaded;
    },
    isPokedexFiltering() {
      return this.$store.state.isPokedexFiltering;
    },
  },
};

export default myComponent;
