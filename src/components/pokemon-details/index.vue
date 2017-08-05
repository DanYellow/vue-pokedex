<template>
  <article class="pkmn-details" v-if="!isLoading">
    <header>
      <figure>
        <img
          v-bind:title="data.name + ' image'"
          v-bind:src="data.sprites.front_default"
          height="150" />
      </figure>
      <h1>{{ data.name | capitalize }}</h1>
      <ul class="characteristics">
        <li> Weight : {{ data.weight }} </li>
        <li> Height : {{ data.height }} </li>
      </ul>
    </header>
    <section>
      <button class="btn--reset" type="button" @click="showGamesCover = !showGamesCover">Appears in : </button>
      <ul class="covers" v-if="showGamesCover">
        <li v-for="cover in allCovers" v-bind:key="cover.version.name">
          <img
            v-bind:src="cover.version.name | getPath"
            height="90" />
        </li>
      </ul>
    </section>
  </article>
  <article class="pkmn-details" v-else>
    <header>
      <figure class="loader">
        <img src="../../assets/loader.gif" alt="" />
      </figure>
      <p>Loading</p>
    </header>
  </article>
</template>

<script src="./script.js"></script>
<style src="./style.css" scoped lang="postcss"></style>
