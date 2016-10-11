// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './vuex/store';

import './assets/common.scss';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  ready : function () {
  	
  },
  render: h => h(App)
})
