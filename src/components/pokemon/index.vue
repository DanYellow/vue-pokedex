<template>
  <li class="pkmn" :class="{ selected: isSelected }">
    <router-link :to="{ path: 'pokemon', query: { id: pkmn.id } }">
      <img v-bind:src="pkmn.sprites.front_default" width="100">
      <p>{{ pkmn.name | capitalize }}</p>
    </router-link>
  </li>

</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
