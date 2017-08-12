<template>
  <form class="form-search" v-on:submit.prevent novalidate>
    <div class="form-search__input-wrapper">
      <div class="form-search__input">
        <p class="input__filter" v-if="Object.keys(filter).length >= 1">{{ filter.name }}</p>
        <div style="width: 100%; position: relative;">
          <input
            @keydown.tab="displayFilter"
            @keydown.delete="deleteFilter"
            @keyup="filterPkmn"
            type="search"
            required
            v-model="query" />
          <span class="floating-label">Pokémon's name</span>
        </div>
      </div>
      <p class="nb-results">{{ pokedex.length }} result(s)</p>
    </div>
  </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
