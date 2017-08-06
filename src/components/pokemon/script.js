import v from 'voca';

const myComponent = {
  props: ['pkmn'],
  created: function () {
    console.log(this.$route.query.id, this.pkmn);
  },
  computed: {
    isSelected: function () {
      return (this.$route.query.id === this.pkmn.id)
    }
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      return v.capitalize(value);
    },
  },
};

export default myComponent;
