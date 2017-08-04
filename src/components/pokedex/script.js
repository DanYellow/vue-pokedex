import Pokemon from '@/components/pokemon';
import PokemonDetails from '@/components/pokemon-details';
import SearchBox from '@/components/search-box';

const BASE_URL = 'http://pokeapi.co/api/v2';
const MAX_ID = 15;

const fetchPkmn = (limit = [], datas) => {
  let pkmnIndex = limit[0];
  fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then((result) => {
    return result.json();
  }).then((pkmn) => {
    if (limit[0] > limit[1]) { return; }
    datas.push(pkmn);
    pkmnIndex += 1;
    fetchPkmn([pkmnIndex, limit[1]], datas);
  });
};

const myComponent = {
  components: {
    pokemon: Pokemon,
    'pkmn-details': PokemonDetails,
    'searchbox': SearchBox,
  },
  created: function () {
    fetchPkmn([1, MAX_ID], this.pokedex);
  },
  data() {
    return {
      pokedex: [],
    };
  },
};

export default myComponent;
