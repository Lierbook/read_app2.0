import Vue from 'vue'
import Vuex from 'vuex'
import { publishingUrl, sortUrl } from '../utils/api'
import axiosGetHttp from '../utils/axiosGetHttp'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publishData: [],
    sortData: [],
    load: true,
    userInfo:{}
  },
  mutations: {
    increment(state, dataObj) {
      state[dataObj.name] = dataObj.datas
      state.load = false
    },
    addUserInfo(state,obj){
      state.userInfo = obj
    }
  },
  actions: {
    // 发送书城·出版模块的http请求
    async getPublishData(context) {
      let res = await axiosGetHttp("get", publishingUrl)
      if (res.msg == 'ok') {
        // console.log(res)
        let dataObj = {
          name: 'publishData',
          datas: res.body.data
        }
        context.commit('increment', dataObj)
      }
    },

    // 发送分类模块的http请求
    async getSortData(context) {
      let res = await axiosGetHttp("get", sortUrl)
      if (res.msg == 'ok') {
        let dataObj = {
          name: 'sortData',
          datas: res.body.data
        }
        context.commit('increment', dataObj)
      }
    }
  },
  getters: {
    //处理书城·出版模块的数据
    handlePublish: (state) => (index) => {
      if (state.publishData) {
        let data = state.publishData[index]
        // console.log(state.publishData)
        return data
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer(val) {
      return {
        // 只储存state中的assessmentData
        userInfo: val.userInfo
      }
    }
  })]
})
