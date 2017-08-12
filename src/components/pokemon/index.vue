<template>
  <li class="pkmn" ref="pkmn" :class="{ selected: isSelected }">
     <router-link :to="{ path: 'pokemon', query: { name: pkmn.name } }"> 
      <img
        v-on:load="imageReady"
        v-on:error="imageReady"
        v-bind:src="pkmn.sprites.front_default"
        width="100" />
      <p>{{ pkmn.id }} | {{ pkmn.name | capitalize }}</p>
      <span>{{ data.message }}</span>
    </router-link>
  </li>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
