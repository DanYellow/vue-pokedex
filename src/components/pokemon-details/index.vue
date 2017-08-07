<template>
  <div class="pkmn-popup">
    <article class="pkmn-details pkmn-details--show" v-if="!isLoading">
      <header>
        <a href="#/">Close</a>
        <figure class="pkmn-details__sprite">
          <img
            v-bind:title="data.name + ' image'"
            v-bind:src="data.sprites.front_default"
            height="150" />
          <figcaption>{{ data.name | capitalize }}</figcaption>
        </figure>
        <ul class="characteristics">
          <li> Weight : {{ data.weight }} </li>
          <li> Height : {{ data.height }} </li>
        </ul>
      </header>
      <section>
        <button class="btn--reset" type="button" @click="showGamesCover = !showGamesCover">Appears in : </button>
        <ul class="pkmn-details__covers" v-if="showGamesCover">
          <li v-for="cover in allCovers" v-bind:key="cover.version.name">
            <img
              v-bind:src="cover.version.name | getPath"
              v-bind:alt="'pokemon ' + cover.version.name"
              v-bind:title="'pokemon ' + cover.version.name"
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
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
