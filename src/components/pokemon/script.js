import v from 'voca';

const myComponent = {
  props: ['pkmn'],
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      return v.capitalize(value);
    },
  },
};

export default myComponent;
