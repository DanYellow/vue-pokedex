export default class Utils {
  /**
   * Get color for type
   * @param  {String} type Type of pokemon
   * @return {String}      Color associated to the type
   */
  static typeColor(type) {
    let color = '';
    switch (type) {
      case 'poison':
        color = 'purple';
        break;
      case 'grass':
        color = '#77c84f';
        break;
      case 'fire':
        color = '#f07f2f';
        break;
      case 'water':
        color = '#0000ff';
        break;
      case 'normal':
        color = '#a7a777';
        break;
      case 'bug':
        color = '#a7b71f';
        break;
      case 'ice':
        color = '#97d8d8';
        break;
      case 'steel':
        color = '#b7b7d0';
        break;
      case 'flying':
        color = '#a78ff0';
        break;
      case 'fighting':
        color = '#bf2f27';
        break;
      case 'fairy':
        color = '#e4a1e1';
        break;
      case 'dragon':
        color = '#6f37f8';
        break;
      case 'electric':
        color = '#f8d02f';
        break;
      case 'psychic':
        color = '#f85787';
        break;
      case 'ground':
        color = '#e0bf67';
        break;
      case 'ghost':
        color = '#6f5797';
        break;
      case 'dark':
        color = '#333333';
        break;
      case 'rock':
        color = '#b79f37';
        break;
      default:
        color = '#000000';
        break;
    }
    return color;
  }

  static unitConvertion(value, type) {
    let val = 42;
    switch (type) {
      case 'weight':
        val = (value * 0.220462) * 1;
        break;
      case 'height': {
        const centimeters = value * 10;
        const inches = centimeters * 0.0328084;
        val = inches;
        break;
      }
      default:
        val = 42;
        break;
    }
    return val.toFixed(2);
  }

  /**
   * Calculate the weakness of a Pokémon
   * @param  {String} offense [description]
   * @param  {String} defense [description]
   * @return {String}         A multiplier
   *
   * http://codegolf.stackexchange.com/questions/55823/its-super-effective#answer-55843
   *
   */
  static computeMatchup(offense, defense) {
    // keys is a list of letters found in the types of attacks/defenses
    const keys = [...'BWSEIRNulkcDPotyeG'];

    // getIndex is a single case statement.
    // it checks each of keys, one-by-one, falling through until we've found the proper index
    const getIndex = x => keys.findIndex(c => x.match(c));

    // encodedValues is a list, indexed by `keys`, where each value is 7-characters.
    const encodedValues = 'kjwhcgnj2xd6elihtlneemw82duxijsazl3sh4iz5akjmlmsqds06xf1sbb8d0rl1nu7a2kjwi3mykjwlbpmk1up4mzl1iuenedor0bdmkjwmpk6rhcg4h3en3pew5';

    // the 7-character value (e.g., B=0="kjwhcgn", W=1="j2xd6el") were created by
    // turning base4 values into base36, so let's turn this back into a string the same way

    const valuesForAttackTemp = parseInt(encodedValues.substr(getIndex(offense) * 7, 7), 36);
    const valuesForAttack = valuesForAttackTemp.toString(4);

    // valuesForAttack is indexed by defenseType.
    // The value will be 0..3, depending on the multiplier

    // let's get an array of the multipliers and reduce...
    const multiplier = defense.split('/').reduce((oldMultiplier, defenseType) => oldMultiplier * [0, 0.5, 1, 2][valuesForAttack[getIndex(defenseType)]], 1);

    return `${multiplier}x`;
  }

  static getWeaknessAndImmunes(pkmnTypes) {
    const result = {};
    const listTypes = {
      bug: 'B',
      water: 'W',
      steel: 'S',
      electric: 'E',
      ice: 'I',
      rock: 'R',
      normal: 'N',
      ground: 'u',
      flying: 'l',
      dark: 'k',
      psychic: 'c',
      dragon: 'D',
      poison: 'P',
      ghost: 'o',
      fighting: 't',
      fairy: 'y',
      fire: 'e',
      grass: 'G',
    };

    // Type offensif, type defensif
    let pkmnType = null;
    for (let i = 0; i < Object.keys(listTypes).length; i += 1) {
      pkmnType = Object.keys(listTypes)[i];
      result[pkmnType] = this.computeMatchup(listTypes[pkmnType], pkmnTypes.split('/').map(type => listTypes[type]).join('/'));
    }

    const group = [];
    result.keys.forEach((key) => {
      group.push({ type: key.capitalizeFirstLetter(), effetiveness: result[key] });
    });
    // for (const key in result.keys) {
    //   if ({}.hasOwnProperty.call(result, key)) {
    //     group.push({ type: key.capitalizeFirstLetter(), effetiveness: result[key] });
    //   }
    // }

    return group;
  }
}
