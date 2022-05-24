/* eslint-disable no-param-reassign */
import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate';
import auth from './store/modules/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
})
