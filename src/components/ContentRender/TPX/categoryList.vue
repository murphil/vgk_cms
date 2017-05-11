<template>
  <div class="category-list">
    <ListRender :list="list" :brief="brief" :path="path"></ListRender>
  </div>
</template>
<style scoped>
  .category-list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    flex: 1 1 auto;
  }
</style>
<script>
  import ListRender from '../HolyGrail/ListRender'
  import {treeEach} from '../../../../utils/treeMap'
  export default{
    name: 'category-list',
    props: ['content'],
    components: {ListRender},
    computed: {
      list(){
        return this.$store.state.articleList[this.content['category_uri']]
          || this.$store.getters.getArticleList
      },
      brief(){
        return this.content.brief
      },
      path(){
        let col = this.content['category_uri'] || this.$store.state.currentColumn
        let res = ''
        treeEach(this.$store.state.columns, (node) => {
          if(node.uri === col){
            res = node.path
          }
        })
        return res
      }
    }
  }
</script>
