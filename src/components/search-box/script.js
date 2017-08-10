import store from '@/store';

const SearchBox = {
  data() {
    return {
      query: '',
      pokedex: store.state,
    };
  },
  computed: {
    searchResult() {
      const filteredPokemon = this.pokedex.pokedex.filter((pkmn) => {
        const pkmnName = pkmn.name;
        return pkmnName.includes(this.query.toLowerCase());
      });

      store.setPokedex(filteredPokemon);

      return filteredPokemon;
    },
  },
};

export default SearchBox;
