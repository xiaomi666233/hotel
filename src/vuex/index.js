import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);
// 状态管理器
export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
  },
  getters,
  actions,
  mutations
});
