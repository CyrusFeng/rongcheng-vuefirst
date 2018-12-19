// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from '../config/rem'
import fetch from './api/fetch'

import '../config/reset.css'

rem()
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch
Vue.prototype.$remove = function remove(arr, val) {
  let index = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) index = i;
  }
  arr.splice(index, 1);
  return arr
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
