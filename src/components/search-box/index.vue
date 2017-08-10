<template>
  <form action="" class="form-search" v-on:submit.prevent>
    <div class="form-search__input-wrapper">
      <div class="form-search__input">
        <p class="input__filter" v-if="Object.keys(filter).length >= 1">{{ filter.name }}</p>
        <input
          @keydown.tab="displayFilter"
          @keydown.delete="deleteFilter"
          type="search"
          v-model="query" />
        <span class="floating-label">Pokémon's name</span>
      </div>
      <p class="nb-results">{{ searchResult.length }} result(s)</p>
    </div>
    
  </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
