<template>
  <div class="pkmn-popup">
    <article class="pkmn-details pkmn-details--show" v-if="!isLoading">
      <header>
        <a href="#/" class="link--btn">Close</a>
        <figure class="pkmn-details__sprite">
          <img
            v-bind:title="data.name + ' image'"
            v-bind:src="data.sprites.front_default"
            height="150" />
          <figcaption>{{ data.name | capitalize }}</figcaption>
        </figure>
        <ul class="characteristics">
          <li> Weight : {{ convertUnit(data.weight, 'weight') }} lbs.</li>
          <li> Height : {{ convertUnit(data.height, 'height') }} ft. </li>
        </ul>
        <ul class="pkmn-details__types">
          <li
            v-for="type in data.types"
            :class="type.type.name"
            :key="type.type.name"
            :style="{ 'background-color': getTypeColor(type.type.name) }" >
            {{ type.type.name }}
          </li>
        </ul>
        <p>
          {{ data.description }}
        </p>
      </header>
      <section>
        <button class="btn--reset btn--toggle-covers" type="button" @click="showDescriptions = !showDescriptions">
          Descriptions :
          <span
            v-bind:class="{ 'icon-chevron-down': !showDescriptions, 'icon-chevron-up': showDescriptions }"></span>
        </button>
        <section class="pkmn-details__slider" v-show="showDescriptions">
          <ul class="pkmn-details__descriptions">
            <li v-for="(covers, version) in data.descriptions" v-bind:key="version">
              <section>
                <figure>
                  <img
                  v-bind:src="version | getPath"
                  v-bind:alt="'pokemon ' + version"
                  v-bind:title="'pokemon ' + version"
                  width="90" />
                </figure>
                <ul class="" v-show="showDescriptions">
                  <li class="pkmn-details__description" v-for="description in covers" v-bind:key="description.language.name">
                    <h6>{{ description.language.name }}</h6>
                    <p>{{ description.flavor_text }}</p>
                  </li>
                </ul>
              </section>
            </li>
          </ul>

          <ul class="pkmn-details__slider__bullets">
            <li v-for="(covers, version, index) in data.descriptions" v-bind:key="version">
              <button 
                :class="{ 'active': (currentDescriptionIndex === index) }"
                :title="'Descrption for Pokemon version ' + version" 
                type="button" class="btn--reset" @click="scrollToDesc(index)">{{ index + 1 }}</button>
            </li>
          </ul>
        </section>
      </section>
      
      <section>
        <button class="btn--reset btn--toggle-covers" type="button" @click="showWeaknessAndImmunes = !showWeaknessAndImmunes">
          Weakness and Immunes :
          <span
            v-bind:class="{ 'icon-chevron-down': !showWeaknessAndImmunes, 'icon-chevron-up': showWeaknessAndImmunes }"></span>
        </button>
        <div v-show="showWeaknessAndImmunes">
          <ul class="pkmn-details__slider__effectiveness">
            <li v-for="(effectiveness, multiplier, index) in data.weaknessAndImmunes" v-bind:key="multiplier">
              <p>{{ multiplier }}</p>
              <ul class="pkmn-details__slider__effectiveness-types">
                <li :style="{ 'background-color': getTypeColor(type.type) }" 
                v-for="type in effectiveness" v-bind:key="type.type">
                  <span>
                    {{ type.type }}
                  </span>
                </li> 
              </ul>
            </li>
          </ul>

          <p>
            Legend : <br />
              - 2x / 4x : Super effective <br />
              - 1x : Effective <br />
              - .5x / .25x : Not very effective <br />
              - 0x : Not effective <br />
          </p>
        </div>
      </section>
      <section>
        <button class="btn--reset btn--toggle-covers" type="button" @click="showGamesCover = !showGamesCover">
          Appears in :
          <span
            v-bind:class="{ 'icon-chevron-down': !showGamesCover, 'icon-chevron-up': showGamesCover }"></span>
        </button>
        <ul class="pkmn-details__covers" v-show="showGamesCover">
          <li v-for="cover in allCovers" v-bind:key="cover.version.name">
            <img
              v-bind:src="cover.version.name | getPath"
              v-bind:alt="'pokemon ' + cover.version.name"
              v-bind:title="'pokemon ' + cover.version.name"
              width="90" />
          </li>
        </ul>
      </section>
      <a href="#/" class="link--btn">Close</a>
    </article>
    <article class="pkmn-details" v-else>
      <header>
        <figure class="loader">
          <img src="static/assets/loader.gif" alt="" />
        </figure>
        <p>Loading</p>
      </header>
    </article>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" scoped lang="scss"></style>
