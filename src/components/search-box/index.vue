<template>
  <form action="">
    <input
      placeholder="Pokemon's name" type="search"
      v-model="query" />
    <p class="nb-results">{{ searchResult.length }} result(s)</p>
  </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
