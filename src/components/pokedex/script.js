import Pokemon from '@/components/pokemon';
import PokemonDetails from '@/components/pokemon-details';
import SearchBox from '@/components/search-box';

import store from '@/store';

const myComponent = {
  components: {
    pokemon: Pokemon,
    'pkmn-details': PokemonDetails,
    searchbox: SearchBox,
  },
  data() {
    return {
      state: store.state,
    };
  },
};

export default myComponent;
