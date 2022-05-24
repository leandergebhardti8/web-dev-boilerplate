import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BBreadcrumb } from 'bootstrap-vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/global-custom-styles.scss'

// axios.defaults.withCredentials = true

// TODO: add this line to connect with backend
//axios.defaults.baseURL = 'https://some-app.herokuapp.com/api/';

// Handle expired Token
axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      store.commit("setTokenNotValid")
      return router.push("/login");
    }
  }
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('b-breadcrumb', BBreadcrumb)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
