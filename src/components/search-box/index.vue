<template>
  <form action="">
    <input
      placeholder="Pokemon's name" type="search"
      v-model="query" />
    {{ searchResult.length }}
  </form>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
