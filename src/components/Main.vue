<template>
  <div id="main">
    <ContentRender :content="getContent"/>
  </div>
</template>
<style>
</style>
<script>
  import ContentRender from './ContentRender'
  import {mapGetters, mapActions} from 'vuex'
  import {toUrlPath} from '../../utils/urlPath'
  import {treeEach} from '../../utils/treeMap'

  export default{
    data(){
      return {}
    },
    components: {
        ContentRender
    },
    computed: {
      ...mapGetters(['getContent', 'getStyleSheet', 'getLayout']),
    },
    async created () {
      await this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      ...mapActions([
        'fetchColumnData'
      ]),
      async fetchData () {
        let origin = this.$route.path
        let path = toUrlPath(origin === '/'? '/main': origin)
        let {column, article} = path.category(this.$store.getters.getColumn, treeEach)
        await this.fetchColumnData({column, article, styleSheet: this.getStyleSheet, currentLayout: this.getLayout.type})
      }
    }
  }
</script>
