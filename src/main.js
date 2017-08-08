// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  watch: {
    '$route.query.id': (id) => {
      if (id) {
        document.body.classList.add('popin');
      } else {
        document.body.classList.remove('popin');
      }
    },
  },
});
