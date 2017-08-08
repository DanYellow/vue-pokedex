import v from 'voca';

import store from '../../store';

const myComponent = {
  props: ['pkmn'],
  data() {
    return {
      data: store.state,
    };
  },
  computed: {
    isSelected() {
      return (this.$route.query.id === this.pkmn.id);
    },
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      return v.capitalize(value);
    },
  },
  methods: {
    imageReady() {
      this.$el.classList.add('ready');
    },
  },
};

export default myComponent;
