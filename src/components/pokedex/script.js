import Pokemon from '@/components/pokemon';

const BASE_URL = 'http://pokeapi.co/api/v2';

const fetchPkmn = (limit = [], datas) => {
  let pkmnIndex = limit[0];
  fetch(`${BASE_URL}/pokemon/${limit[0]}/`).then((result) => {
  return result.json()
}).then((pkmn) => {
  if (limit[0] > limit[1]) { return }
  datas.push(pkmn);
  pkmnIndex++;
  fetchPkmn([pkmnIndex, limit[1]], datas);
});
}

const myComponent = {
  components: {
    'pokemon': Pokemon
  },
  created: function () {
    fetchPkmn([1, 20], this.pokedex);
  },
  data() {
    return {
      pokedex: [],
    };
  },
};

export default myComponent;
