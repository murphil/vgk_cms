<template>
    <div class="content-editor" :key="uuid">
        <!--
        <svg width="1000" height="800">
            <SVGNode :layout="currLayout">
            </SVGNode>
        </svg>
        -->
        <Node class="ce-tree"
              :content="draft"
              :handlers="handlers"
              :depth="1"
              :width="1"
              :path="''" :recursion="true"/>
        <PropertyPanel class="ce-property"
                       :handlers="handlers"
                       :content="currNode"
                       :path="currPath"/>
        <pre v-if="dev_mode">
            {{JSON.stringify(draft, null, ' ')}}
        </pre>
        <div class="ce-preview">
            <InFrame :content="draft" />
        </div>
    </div>
</template>
<script>
  import Node from './node.vue'
  import PropertyPanel from './property.vue'
  import {InFrame} from './iframe'
  import {getNode} from '../../utils/modTreeNode'
  import SVGNode from './svgNode.vue'
  import {hierarchy, tree} from 'd3-hierarchy'
  import {editNode, changeProperty, dragSrc, dragNode, insertNode} from './events'
  export default{
    name: 'Editor',
    props: ['content', 'recursion', 'uuid'],
    components: {Node, PropertyPanel, InFrame, SVGNode},
    data() {
      return {
        draft: this.content,
        currPath: "",
        _dragSrc: "",
        dev_mode: false,
        handlers: {
          editNode: editNode.bind(this),
          changeProperty: changeProperty.bind(this),
          dragSrc: dragSrc.bind(this),
          dragNode:dragNode.bind(this),
          insertNode:insertNode.bind(this)
        }
      }
    },
    watch: {
      content(newContent){
        this.draft = newContent
      }
    },
    computed: {
      currNode(){
        return getNode(this.draft, this.currPath)
      },
      customStyle () {
        if (this.content) {
          return this.content.style
        }
      },
      customCss () {
        if (this.content) {
          return this.content.css
        }
      },
      currLayout(){
        let x = hierarchy(this.draft)
        let y = tree(x)
        console.log('y', y )
        return x
      }
    },
    beforeCreate() {
      //console.log('Editor beforeCreate')
    },
    beforeDestroy(){
      //console.log('Editor beforeDestroy')
    },
    methods: {
      dev() {
        this.dev_mode = !this.dev_mode
      }
    }
  }


</script>
<style>
    .content-editor {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .content-editor .ce-tree {
        flex: 0 0 30%;
    }

    .content-editor .ce-property {
        flex: 0 0 20%;
    }

    .content-editor .ce-preview {
        position: absolute;
        left: 70%;
        zoom: 0.5;
        transform: scale(0.5);
    }

</style>