import * as types from './mutation-types'
import Vue from 'vue'
import appendStyleToHead from '../utils/appendStyleToHead'

let GQLReqH = {
  key: 'Content-Type',
  value: 'application/graphql;charset=utf-8'
}

export default {
  async initColumnTree({dispatch, commit}, layoutName) {
    let initFetch = `query {
                       category {
                         name,
                         uri,
                         id,
                         parent_id,
                         weight
                         },
                       layout(name:"${layoutName}"){
                         type, header, footer,
                         modal, nav, ads, styles
                       },
                   }`
    let res = await Vue.http.post(`/graphql`, initFetch, {
      headers: {
        [GQLReqH.key]: GQLReqH.value
      }
    })
    let { category, layout,
         //'content_collect': {'page_content':content, 'article_list': articles, 'style_sheet': styleSheet}
        }= res.body.data
    commit(types.INIT_COLUMN, category)
    commit(types.SAVE_LAYOUT, layout)
    let styleSheet = layout.styles
    if (styleSheet) {
      for (let s in styleSheet) {
        commit(types.NEW_STYLESHEET, s)
      }
      appendStyleToHead(styleSheet)
    }
    delete layout.styles
  },
  saveContent({commit}, {key, payload}){
    commit(types.SAVE_CONTENT, {key, payload})
  },
  saveLayout({commit}, payload){
    commit(types.SAVE_LAYOUT, payload)
  },
  saveArticleList({commit}, payload){
    commit(types.SAVE_ARTICLE_LIST, payload)
    console.log('saveArticlelst',payload)
  },
  setCurrentContent({commit}, payload) {
    commit(types.SET_CURRENT_CONTENT, payload)
  },
  setCurrentLayout({commit}, payload) {
    commit(types.SET_CURRENT_LAYOUT, payload)
  },
  setCurrentColumn({commit}, payload){
    commit(types.SET_CURRENT_COLUMN, payload)
  },
  setCurrentArticle({commit}, payload){
    commit(types.SET_CURRENT_ARTICLE, payload)
  },
  setCurrentArticleList({commit}, payload) {
    commit(types.SET_CURRENT_ARTICLE_LIST, payload)
  },
  async fetchColumnData({dispatch, commit}, {column, article, styleSheet, currentLayout}) {
    let query = `query {
                       content_collect(category_uri:"${column}",
                                       uri:"${article || ""}",
                                       style_sheet: "${styleSheet.join(',')}",
                                       current_layout: "${currentLayout}",
                                       article_limit: 10) {
                       page_content,
                       article_list {
                         title, author, uri,
                         content, created_at, updated_at,
                         category_uri
                       },
                       style_sheet
                     }
                   }`
    try {
      let res = (await Vue.http.post(`/graphql`, query, {
        headers: {
          [GQLReqH.key]: GQLReqH.value
        }
      }))
      let {'page_content':content, 'article_list': articleList, 'style_sheet': styleSheet}= res.body.data['content_collect']
      commit(types.SET_CURRENT_COLUMN, column)
      commit(types.SET_CURRENT_ARTICLE, article)
      commit(types.SAVE_CONTENT, {column, article, payload: content})
      commit(types.SAVE_ARTICLE_LIST, articleList)
      if (styleSheet) {
        for (let s in styleSheet) {
          commit(types.NEW_STYLESHEET, s)
        }
        appendStyleToHead(styleSheet)
      }
    } catch (e) {
      console.log(e)
    }
  },

  async externalMessage({commit}, payload){
    let query = `mutation {
                   externalMessage( name:"${payload.name}"
                                  , mail:"${payload.mail}"
                                  , phone:"${payload.phone}"
                                  , content:"${payload.msg}")
                           }`
    try {
      let res = await Vue.http.post(`/graphql`, query, {
        headers: {
          [GQLReqH.key]: GQLReqH.value
        }
      })
      let ok = res.body.data.externalMessage
      if (ok) {
        commit(types.SUCC_MSG, {success: '提交留言成功'})
      } else {
        commit(types.ERROR_MSG, {error: res.body.errors[0].message})
      }
    } catch (e) {
      commit(types.ERROR_MSG, {error: e})
    }
  },

  errorMessage({commit}, payload) {
    commit(types.ERROR_MSG, {
      type: types.ERROR_MSG,
      payload
    })
  },
  successMessage({commit}, payload) {
    commit(types.SUCC_MSG, {
      types: types.SUCC_MSG,
      payload
    })
  },
};
