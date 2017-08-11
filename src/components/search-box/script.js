import store from '@/store';

const kantoRange = { names: ['kanto', '1g', 'tseho'], range: [1, 151] };
const johtoRange = { names: ['johto', '2g'], range: [152, 251] };
const hoennRange = { names: ['hoenn', '3g'], range: [252, 386] };
const sinnohRange = { names: ['sinnoh', '4g'], range: [387, 493] };
const unysRange = { names: ['unys', '5g'], range: [494, 649] };
const kalosRange = { names: ['kalos', '6g'], range: [650, 721] };

const REGIONS = [kantoRange, johtoRange,
  hoennRange, sinnohRange, unysRange, kalosRange];

const SearchBox = {
  created() {
    this.filters = {
      generations: ['tseho', 'kanto', 'hoenn', 'johto', 'sinnoh', 'unys', 'kalos', 'aloha'],
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
        if (this.filters[key].includes(this.query.toLowerCase()) ||
          /^[1-5]g$/.test(this.query.toLowerCase())
        ) {
          this.filter.name = this.query;
          this.filter.type = key;
          this.query = '';
          store.toggleInfiniteScroll(true);
        }
      });
    },
    deleteFilter() {
      if (this.query === '') {
        this.filter = {};
        store.toggleInfiniteScroll(false);
      }
    },
    preFilterPokemon() {
      if (!Object.keys(this.filter).length) {
        return this.pokedex.pokedex;
      }
      return this.pokedex.pokedex.filter((pkmn) => {
        switch (this.filter.type) {
          case 'generations':
            let indexRegion = 0;
            REGIONS.forEach((region, index) => {
              region.names.forEach((regionAlias) => {
                if (regionAlias === this.filter.name) {
                  indexRegion = index;
                }
              })
            });
            const currentRegion = REGIONS[indexRegion];

            return (pkmn.id >= currentRegion.range[0] && pkmn.id <= currentRegion.range[1]);
          case 'types':
            return pkmn.types.filter(type => (type.type.name === this.filter.name)).length > 0;
          default: return true;
        }
      });
    },
  },
};

export default SearchBox;
