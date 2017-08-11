<template>
  <div class="pokedex-wrapper" v-infinite-scroll>
    <searchbox></searchbox>
    <div class="pokedex" v-if="state.filtered.length > 0">
      <div style="flex: 2;">
        <ol>
          <pokemon
            v-for="pkmn in state.filtered"
            v-bind:pkmn="pkmn"
            v-bind:key="pkmn.id"></pokemon>
        </ol>
      </div>
      <router-view></router-view>
      <loader v-if="!state.endLoaded" />
    </div>
    <div class="pokedex-wrapper__no-results" v-else-if="state.filtered.length === 0 && state.endLoaded">
      <figure>
        <img src="https://media1.giphy.com/media/nLIiW6wj9WnSM/giphy.gif" alt="">
      </figure>
      <p>No results</p>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
