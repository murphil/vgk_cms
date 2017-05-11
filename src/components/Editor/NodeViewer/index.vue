<template>
    <component :is="ConcreteComponent"
               :content="content"
    >
    </component>
</template>
<script>
    import Dft from './default.vue'
    export default {
      name: 'PropertyEditor',
      props: ['content'],
      computed: {
        ConcreteComponent() {
          try {
            if (this.content && this.content.type)
              return require(`./${this.content.type}.vue`)
            else return Dft
          } catch (e) {
            return Dft
          }
        },
      }
    }
</script>