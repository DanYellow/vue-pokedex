import v from 'voca';

import store from '../../store';

const myComponent = {
  props: ['pkmn'],
  data: function () {
    return {
      data: store.state,
    };
  },
  computed: {
    isSelected: function () {
      // console.log('f', );
      // this.$set(this.$root.$data, 'b', 2)
      return (this.$route.query.id === this.pkmn.id);
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
