const SearchBox = {
  props: ['pokedex'],
  data: function () {
    return {
      query: '',
    };
  },
  created: function () {
    console.log('f', this.pokedex);
  },
  computed: {
    searchResult: function () {
      return this.pokedex.filter(pkmn => {
        const pkmnName = pkmn.name;
        return pkmnName.includes(this.query);
      })
    }
  },
};

export default SearchBox;
