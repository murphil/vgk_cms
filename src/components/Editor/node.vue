<template>
    <div v-if="content"
         class="editor-tree-node"
         @drag="onDrag"
         draggable="true">
        <div v-if="content.type"
             :data-path="path"
             @mouseenter.stop.prevent="onMouseEnter"
             @mouseout.stop.prevent="onMouseOut"
             @click.stop.prevent="onClick"
             class="editor-tree-node-title">
            {{content.type}}
                <!--
                <NodeViewer :content="content"></NodeViewer>
                -->
            <div v-if="onHover" class="editor-tree-node-preview">
                <div>
                    <ContentRender :content="content"
                                   :recursion="true">
                    </ContentRender>
                </div>
            </div>
        </div>
        <template v-if="content.children">
            <div class="editor-tree-node-children">
                <div class="editor-tree-node-drag-target"
                     :data-target="path+'/0'"
                     @click.stop="onInsert"
                     @dragenter.stop.prevent="onDragEnter"
                     @dragleave.stop.prevent="onDragLeave"
                     @dragover.stop.prevent="onDragOver"
                     @drop.prevent="onDrop"></div>
                <template v-for="(i,j) in content.children">
                    <editorTreeNode :content="i"
                                    :handlers="handlers"
                                    :path="path+'/'+j"/>
                    <div class="editor-tree-node-drag-target"
                         :data-target="path+'/'+(j+1)"
                         @click.stop="onInsert"
                         @dragenter.stop.prevent="onDragEnter"
                         @dragleave.stop.prevent="onDragLeave"
                         @dragover.stop.prevent="onDragOver"
                         @drop.stop.prevent="onDrop"></div>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
  import PropertyPanel from './property.vue'
  import NodeViewer from './NodeViewer'
  export default {
    name: 'editorTreeNode',
    props: ['content', 'path', 'handlers'],
    components: {PropertyPanel, NodeViewer},
    data(){
      return {
        onHover: false,
        editable: false,
      }
    },
    methods: {
      onMouseEnter(e){
        this.onHover = true
      },
      onMouseOut(e){
        this.onHover = false
      },
      onClick(e) {
        this.editable = !this.editable
        let path = e.target.dataset['path']
        this.handlers.editNode(path)
      },
      onDragEnter(e){
        let cl = e.target.classList
        cl.add('on-drag-over')
      },
      onDragLeave(e){
        let cl = e.target.classList
        cl.remove('on-drag-over')
      },
      onDragOver(e){
      },
      onDrag(e){
        let p = e.target.children[0].dataset['path']
        this.handlers.dragSrc(p)
        //e.dataTransfer.setData("text", p);
      },
      onDrop(e){
        e.target.classList.remove('on-drag-over')
        let tgt = e.target.dataset['target']
        let src //= e.dataTransfer.getData('text')
        this.handlers.dragNode({
          target: tgt,
          source: src
        })
      },
      onInsert(e){
        let tgt = e.target.dataset['target']
        this.handlers.insertNode(tgt)
      }
    },
    beforeCreate: function () {
      this.$options.components.ContentRender = require('../ContentRender')
    },
  }
</script>
<style>
    .editor-tree-node {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-left: 1em;
    }

    .editor-tree-node .editor-tree-node-title {
        display: flex;
        flex: 0 1 auto;
    }

    .editor-tree-node .editor-tree-node-children {
        display: flex;
        flex-flow: column nowrap;
        border-left: #81bf8d 3px solid;
        border-radius: 8px;
        margin: 0 1em;
        flex: 1 0 10em;
    }

    .editor-tree-node .editor-tree-node-preview {
        display: flex;
        flex-flow: row nowrap;
        z-index: 1;
        background-color: #888888;
        position: absolute;
        zoom: 0.25;
        transform: scale(0.25,0.25);
        transform-origin:left top;
        outline: 5px solid #81bf8d;
    }

    .editor-tree-node .editor-tree-node-drag-target {
        height: .7em;
        border-radius: inherit;
        transition: background-color 1s ease;
    }

    .editor-tree-node .editor-tree-node-drag-target:hover {
        background-color: #b6ffb6;
        cursor: crosshair;
    }

    .on-drag-over {
        background-color: yellow;
    }

</style>
