<template>
  <component :is="ConcreteComponent" :content="content" :recursion="recursion">
    <template v-if="content && content.children && content.children.length > 0">
      <template v-for="child in content.children">
        <ContentRender :content="child" :recursion="recursion"></ContentRender>
      </template>
    </template>
  </component>
</template>

<script>
  import {getComponent} from './__typeToComponent.vue'

  export default{
    name: 'ContentRender',
    props: ['content', 'recursion'],
    data(){
      return {
        layout: this.$store.state.layout.type
      }
    },
    computed: {
      ConcreteComponent () {
        if (! this.content) {
          return getComponent('noExistThisType')
        } else {
          return getComponent(this.content.type, this.layout)
        }
      }
    }
  }
</script>

