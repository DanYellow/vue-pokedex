<template>
  <li class="pkmn">
    <router-link :to="{ path: 'pokemon', query: { userId: 123 } }">
      <img v-bind:src="pkmn.sprites.front_default">
      <p>{{ pkmn.name }}</p>
    </router-link>
  </li>

</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
