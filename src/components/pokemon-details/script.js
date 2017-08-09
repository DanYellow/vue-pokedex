import v from 'voca';

import store from '@/store';
import Utils from '@/utils';

const BASE_URL = 'http://pokeapi.co/api/v2';

const myComponent = {
  props: ['pkmn-details'],
  created() {
    this.fetchPkmn(this.$route.query.name);
  },
  watch: {
    '$route.query.name': (name) => {
      this.fetchPkmn(name);
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
    fetchPkmn(name) {
      if (this.isLoading || !name) return;
      this.isLoading = true;

      const currentPkmn = store.state.pokedex.find((pkmn) => (
        pkmn.name === name
      ));
      if (currentPkmn) {
        this.data = currentPkmn;
      } else {
        fetch(`${BASE_URL}/pokemon/${name}/`).then(result => (
          result.json()
        )).then((pkmn) => {
          this.isLoading = false;
          this.data = pkmn;
          this.data.description = [];
        });
      }

      fetch(`${BASE_URL}/pokemon-species/${name}/`).then(result => (
          result.json()
        )).then((pkmn) => {
          this.data.description = this.getDescForLocale(
            pkmn.flavor_text_entries
          );
        });
    },
    getTypeColor: (type) => {
      if (!type) return '';
      return Utils.typeColor(type);
    },
    getDescForLocale: (descriptions, locale = 'fr') => {
      return descriptions.find((description) => (
        description.language.name === locale
      ));
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
