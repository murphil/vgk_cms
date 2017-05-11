<template>
    <div class="editor-property">
        <PropertyEditor :value="content.type" type="type"
                        :handlers="handlers"
                        :path="path"/>
        <div v-if="currProperty.length > 0" v-for="p in currProperty">
            <label>
                {{p}}
            </label>
            <PropertyEditor :value="content[p]" :type="p"
                            :handlers="handlers"
                            :path="path"/>
        </div>
        <div class="path">path: {{path}}</div>
    </div>
</template>
<script>
  let PropertyEditor = require('./PropertyEditor')
  export default {
    name: 'editorPropertyPanel',
    props: ['content', 'path', 'handlers'],
    components: {PropertyEditor},
    computed: {
      propertyOfType: () => ({
        // 第一项表示是否为容器组件。其余的是包含的字段，按顺序显示
        ScrollContainer  : [true , 'title'],
        ColumnContainer  : [true , 'css', 'style'],
        RowContainer     : [true , 'css', 'style'],
        OverlayContainer : [true , 'css', 'style'],
        SVG              : [true , 'css', 'style'],
        markdown         : [false, 'payload', 'css', 'style'],
        button           : [false, 'text', 'css', 'style'],
        svgBgBubble      : [false, 'num'],
        svgPCB           : [false, ],
        figure           : [false, 'img', 'md', 'css', 'style'],
        TitleContainer   : [true , 'title', 'css', 'style',],
        messageBoard     : [false, 'title', 'css', 'style',],
        categoryList     : [false, 'category_uri', 'title', 'brief'],
        treeEditor       : [false, ]
      }),
      currProperty() {
        let comp = this.propertyOfType[this.content.type]
        if (comp) {
          return comp.slice(1)
        }
      }
    }
  }

</script>
<style>
    .editor-property {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: stretch;
        flex: 1 1 100%;
    }

    .editor-property .path {
        color: lightblue;
        border-top: 1px dashed lightblue;
        margin-top: 4px;
    }

    .editor-property > div {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
    }

    .editor-property > div > * {
        flex: 1 1 100%;
        width: 100%;
        box-sizing: border-box;
    }

    .editor-property > div > label {

    }
</style>