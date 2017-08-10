import store from '@/store';

const kantoRange = { name: 'kanto', range: [1, 151] };
const tsehoRange = { name: 'kanto', range: [1, 11] };
const johtoRange = { name: 'johto', range: [152, 251] };
const hoennRange = { name: 'hoenn', range: [252, 386] };
const sinnohRange = { name: 'sinnoh', range: [387, 493] };
const unysRange = { name: 'unys', range: [494, 649] };
const kalosRange = { name: 'kalos', range: [650, 721] };

const REGIONS = [kantoRange, tsehoRange, johtoRange,
  hoennRange, sinnohRange, unysRange, kalosRange];

const SearchBox = {
  created() {
    this.filters = {
      generations: ['tseho', '1g', 'kanto', 'hoenn', 'johto', 'sinnoh', 'unys', 'kalos', 'aloha'],
      types: ['fire', 'water', 'ground', 'bug', 'steel', 'electric', 'ice', 'rock', 'normal', 'flying', 'dark', 'psychic', 'dragon', 'poison', 'ghost', 'fighting', 'fairy', 'fire', 'grass'],
    };
  },
  data() {
    return {
      query: '',
      pokedex: store.state,
      filter: {},
    };
  },
  computed: {
    searchResult() {
      const dexPrefiltered = this.preFilterPokemon(this.pokedex.pokedex);
      const filteredPokemon = dexPrefiltered.filter((pkmn) => {
        const pkmnName = pkmn.name;
        return pkmnName.includes(this.query.toLowerCase());
      });

      store.setPokedex(filteredPokemon);

      return filteredPokemon;
    },
  },
  methods: {
    displayFilter(e) {
      e.preventDefault();

      Object.keys(this.filters).forEach((key) => {
        if (this.filters[key].includes(this.query.toLowerCase())) {
          this.filter.name = this.query;
          this.filter.type = key;
          this.query = '';
        }
      });
    },
    deleteFilter() {
      if (this.query === '') {
        this.filter = {};
      }
    },
    preFilterPokemon() {
      if (!Object.keys(this.filter).length) {
        return this.pokedex.pokedex;
      }
      return this.pokedex.pokedex.filter((pkmn) => {
        switch (this.filter.type) {
          case 'generations':
            console.log('t',
              REGIONS.filter(region => (pkmn.id >= region.range[0] && pkmn.id <= region.range[1]))
            );
            return REGIONS.filter(region => (pkmn.id >= region.range[0] && pkmn.id <= region.range[1]));
          case 'types':
            return pkmn.types.filter(type => (type.type.name === this.filter.name)).length > 0;
          default: return true;
        }
      });
    },
  },
};

export default SearchBox;
