// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const KEYS = {
  ESCAPE: 27,
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    document.body.addEventListener('keydown', this.handleEscapeKey);
    if (this.$route.query.name) {
      document.body.classList.add('popin');
    }
  },
  watch: {
    '$route.query.name': (name) => {
      if (name) {
        document.body.classList.add('popin');
      } else {
        document.body.classList.remove('popin');
      }
    },
  },
  methods: {
    handleEscapeKey(e) {
      if (e.keyCode === KEYS.ESCAPE) {
        window.location = '#/';
      }
    },
  },
});
