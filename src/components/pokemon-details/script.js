/* eslint-disable */
import v from 'voca';

import store from '@/store';
import Utils from '@/utils';

const BASE_URL = 'http://pokeapi.co/api/v2';
const d = document.body;

const myComponent = {
  props: ['pkmn-details'],
  created() {
    this.fetchPkmn(this.$route.query.name);
  },
  mounted() {
    this.$descriptionsContainer = null;
    this.$descriptions = null;
  },
  watch: {
    '$route.query.name': (name) => {
      this.fetchPkmn(name);
    }
  },
  updated() {
    if (Object.keys(this.data.descriptions).length && (this.$descriptions === null || this.$descriptionsContainer === null)) {
      this.$descriptionsContainer = d.querySelector('.pkmn-details__descriptions');
      this.$descriptions = d.querySelectorAll('.pkmn-details__descriptions > li');
    }
  },
  data() {
    return {
      data: { descriptions: {} },
      isLoading: false,
      showGamesCover: false,
      showWeaknessAndImmunes: false,
      showDescriptions: false,
      showStats: true,
      store: store.state,
      currentDescriptionIndex: 0,
    };
  },
  methods: {
    fetchPkmn(name) {
      if (this.isLoading || !name) return;
      this.isLoading = true;

      this.$store.dispatch('fetchPkmnByName', name).then((currentPkmn) => {
        this.isLoading = false;
        currentPkmn.descriptions = this.groupByVersion(currentPkmn.descriptions.flavor_text_entries);
        this.data = currentPkmn;
      });
    },
    getTypeColor: (type) => {
      if (!type) return '';
      return Utils.typeColor(type);
    },
    getDescForLocale: (descriptions, locale = 'fr') => {
      return descriptions.find(description => (
        description.language.name === locale
      ));
    },
    groupByVersion(descriptions) {
      const result = {};
      descriptions.forEach((description) => {
        if (result[description.version.name]) {
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
      const offset = -(index * this.$descriptionsContainer.offsetWidth);
      this.currentDescriptionIndex = index;
      const currentDescHeight = this.$descriptions[index].clientHeight;

      this.$descriptionsContainer.addEventListener('transitionend', (e) => {
        e.target.style.height = `${currentDescHeight}px`;
      });

      this.$descriptionsContainer.style.transform = `translate3d(${offset}px, 0, 0)`;
    },
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
