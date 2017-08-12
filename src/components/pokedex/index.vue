<template>
  <div class="pokedex-wrapper">
    <searchbox></searchbox>
    <div class="pokedex" v-if="pokedex.length > 0">
      <div style="flex: 2;">
        <p>foo : {{ pokedex.length }}</p>
        <ol>
          <pokemon
            v-for="pkmn in pokedex"
            v-bind:pkmn="pkmn"
            v-bind:key="pkmn.id"></pokemon>
        </ol>
      </div>
      <router-view></router-view>
      <loader v-if="!endLoaded" />
    </div>
    <div class="pokedex-wrapper__no-results" v-else-if="pokedex.length === 0 && endLoaded && isPokedexFiltering">
      <figure>
        <img src="https://media1.giphy.com/media/nLIiW6wj9WnSM/giphy.gif" alt="">
      </figure>
      <p>No results</p>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
