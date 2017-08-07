<template>
  <form action="">
    <input
      placeholder="Pokemon's name" type="search"
      v-model="query" />
    <p>{{ searchResult.length }} result(s)</p>
  </form>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
