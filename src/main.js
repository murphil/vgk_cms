import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/'
import App from './App'
import routes from './routes'
import VueResource from 'vue-resource'
/*
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    transportBatching: true
  })
})
Vue.use(VueApollo, {
  apolloClient
})
*/
Vue.use(VueRouter)
Vue.use(VueResource)

// element-ui
import {Carousel, CarouselItem} from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
  http: {
    headers: {
      'Content-Type': 'application/graphql;charset=utf-8',
      'Authorization': 'Bearer YXBpOnBhc3N3b3Jk'
    }
  }
});

global.app = app
