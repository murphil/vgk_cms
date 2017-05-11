import * as types from './mutation-types'
import {buildTree, treeEach} from '../../utils/treeMap'
import {listGroup} from '../../utils/listGroup'

export default {
  [types.INIT_COLUMN] (state, payload) {
    let categoryTree = buildTree(payload)
    treeEach(categoryTree, (node, parent) => {
      if (parent) {
        node.path = `${parent.path}/${node.uri}`
      } else {
        node.path = `/${node.uri}`
      }
    })
    state.columns = categoryTree
  },
  [types.SAVE_CONTENT] (state, {column, article, payload}) {
    if (article && article.length > 0) {
      payload.children = [payload.content]
      delete payload.content
      state.articles[`${column}/${article}`] = payload
    } else {
      state.contents[column] = payload
    }
  },
  [types.SAVE_LAYOUT] (state, payload) {
    state.layout = payload
  },
  [types.SAVE_ARTICLE_LIST] (state, payload){
    Object.assign(state.articleList, listGroup('category_uri', payload))
  },

  [types.SET_CURRENT_COLUMN] (state, payload) {
    state.currentColumn = payload
  },
  [types.SET_CURRENT_ARTICLE] (state, payload) {
    state.currentArticle = payload
  },

  [types.NEW_STYLESHEET] (state, payload) {
    state.styleSheets.push(payload)
  },

  [types.ERROR_MSG] (state, payload) {
    payload.type = types.ERROR_MSG
    state.message.push(payload)
  },
  [types.SUCC_MSG] (state, payload) {
    payload.type = types.SUCC_MSG
    state.message.push(payload)
  }
};
