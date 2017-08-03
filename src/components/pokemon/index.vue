<template>
  <li class="pkmn">
    <a href="">
      <img v-bind:src="pkmn.sprites.front_default">
      <p>{{ pkmn.name }}</p>
    </a>
  </li>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
