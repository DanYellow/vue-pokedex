import v from 'voca';

const BASE_URL = 'http://pokeapi.co/api/v2';

const myComponent = {
  props: ['pkmn-details'],
  created: function () {
    this.fetchPkmn(this.$route.query.id);
  },
  watch: {
    '$route.query.id': function (id) {
      this.fetchPkmn(id);
    },
  },
  data: function () {
    return {
      data: {},
      isLoading: false,
    };
  },
  methods: {
    fetchPkmn(id) {
      if (this.isLoading) return;

      this.isLoading = true;
      fetch(`${BASE_URL}/pokemon/${id}/`).then(result => (
        result.json()
      )).then((pkmn) => {
        this.isLoading = false;
        this.data = pkmn;
      });
    },
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      return v.capitalize(value);
    },
    getPath: (value) => {
      if (!value) return '';
      return require(`../../assets/games_cover/${value}.png`);
    }
  },
};

export default myComponent;
