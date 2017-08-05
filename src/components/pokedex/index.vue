<template>
  <div class="pokedex-wrapper">
    <searchbox v-bind:pokedex="pokedex"></searchbox>
    <div class="pokedex">
      <ol>
        <pokemon
          v-for="pkmn in pokedex"
          v-bind:pkmn="pkmn"
          v-bind:key="pkmn.id"></pokemon>
      </ol>

      <router-view></router-view>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
