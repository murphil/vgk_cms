import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  currentUser: "",     // 用户登录

  columns: {},
  layout: {},          // 与 column type 相关
  contents: {},        // 与 column 相关
  articleList: {},     // 默认与 column 相关
  currentColumn: "",
  styleSheets: [],     // 已有的样式表，需要发送给服务器，避免重复下载
  articles: {},
  currentArticle: null,

  message: [],
};

const getters = {
  getContent: state => {
    if (state.currentArticle && state.currentArticle.length > 0){
      return state.articles[`${state.currentColumn}/${state.currentArticle}`]
    } else {
      return state.contents[state.currentColumn]
    }
  },
  getLayout: state => {
    return state.layout
  },
  getColumn: state => {
    return state.columns
  },
  getArticleList: state => {
    return state.articleList[state.currentColumn]
  },
  getStyleSheet: state => {
    return state.styleSheets
  },
  lastMessage: state => {
    let last = state.message.length - 1
    return state.message[last]
  },
  getMessages: state => {
    return state.message
  },
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})
