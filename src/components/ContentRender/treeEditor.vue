<template>
  <div class="treeEditor"
       :class="customStyle"
       :style="customCss" >
    <div class="sidebar">
      <div v-for="(i, idx) in titles"
           @click="clickTitle"
           :data-id='i'>
        {{i}}
      </div>
    </div>
    <div class="editor">
      <Editor :content="src" :uuid="curr"></Editor>
    </div>
  </div>
</template>
<script>
  import Editor from '../Editor'
  import {mapState} from 'vuex'
  import CR from '../../utils/CRMixin'
  export default{
    name: 'treeEditor',
    components: {Editor},
    mixins: [CR],
    data() {
      return {
        curr: null,
      }
    },
    computed: {
      ...mapState(['contents']),
      src(){
        if (this.curr) {
          return this.contents[this.curr]
        } else {
          return {
            type: "ScrollContainer",
            children: [
              {
                type: "markdown",
                payload: "# markdown"
              }
            ]
          }
        }
      },
      titles () {
        let res = []
        for (let i in this.contents) {
          res.push(i)
        }
        return res
      },
    },
    methods: {
      clickTitle(e){
        this.curr = e.target.dataset['id']
      }
    }
  }
</script>
<style>
  .treeEditor {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    font-size: 12px;
  }
  .treeEditor .sidebar {
    display: flex;
    flex-flow: column nowrap;
    margin-right: 3em;
  }
  .treeEditor .editor {
    display: flex;
    flex-flow: row nowrap;
  }
</style>
