import v from 'voca';

import store from '@/store';
import Utils from '@/utils';

const BASE_URL = 'http://pokeapi.co/api/v2';
const d = document;

const myComponent = {
  props: ['pkmn-details'],
  created() {
    this.fetchPkmn(this.$route.query.name);
    this.$descriptions = d.getElementsByClassName('pkmn-details__descriptions')[0];
    //d.querySelector('.pkmn-details__descriptions');
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
      showWeaknessAndImmunes: false,
      showDescriptions: false,
      store: store.state,
      currentDescriptionIndex: 0,
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
          this.data.descriptions = [];
          this.data.weaknessAndImmunes = Utils.getWeaknessAndImmunes(this.data.types.map((type) => {
            return type.type.name;
          }));
        });
      }

      fetch(`${BASE_URL}/pokemon-species/${name}/`).then(result => (
          result.json()
        )).then((pkmn) => {
          this.isLoading = false;
          this.data.descriptions = this.groupByVersion(pkmn.flavor_text_entries);
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
    groupByVersion(descriptions) {
      const result = {};
      descriptions.map((description) => {
        if(result[description.version.name]) {
          const currentVersions = result[description.version.name];
          currentVersions.push(description);
          result[description.version.name] = currentVersions;
        } else {
          result[description.version.name] = [description];
        }
      });
      return result;
    },
    convertUnit: (unit, type) => Utils.unitConvertion(unit, type),
    scrollToDesc(index = 1) {
      const offset = - (index * d.querySelector('.pkmn-details__descriptions').offsetWidth);
      this.currentDescriptionIndex = index;
      d.querySelector('.pkmn-details__descriptions').style.transform = `translate3d(${offset}px, 0, 0)`;
    }
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
