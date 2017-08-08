import v from 'voca';

import store from '@/store';
import Utils from '@/utils';

const BASE_URL = 'http://pokeapi.co/api/v2';

const myComponent = {
  props: ['pkmn-details'],
  created() {
    this.fetchPkmn(this.$route.query.id);
  },
  watch: {
    '$route.query.id': (id) => {
      this.fetchPkmn(id);
    },
  },
  data() {
    return {
      data: {},
      isLoading: false,
      showGamesCover: false,
      store: store.state,
    };
  },
  methods: {
    fetchPkmn(id) {
      if (this.isLoading || !id) return;

      if ((id - 1) <= this.store.pokedex.length) {
        this.data = this.store.pokedex[id - 1];
      } else {
        this.isLoading = true;
        fetch(`${BASE_URL}/pokemon/${id}/`).then(result => (
          result.json()
        )).then((pkmn) => {
          this.isLoading = false;
          this.data = pkmn;
          this.data.evolutions = [];
        });
      }
    },
    getTypeColor: (type) => {
      if (!type) return '';
      return Utils.typeColor(type);
    },
    convertUnit: (unit, type) => Utils.unitConvertion(unit, type),
  },
  computed: {
    allCovers() {
      const missingCovers = [
        { version: { name: 'moon' } },
        { version: { name: 'sun' } },
        { version: { name: 'omega-ruby' } },
        { version: { name: 'alpha-sapphire' } },
      ];

      return [...missingCovers, ...this.data.game_indices];
    },
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';

      return v.capitalize(value);
    },
    getPath: (value) => {
      if (!value) return '';

      return `static/assets/games_cover/${value}.png`;
    },
  },
};

export default myComponent;
