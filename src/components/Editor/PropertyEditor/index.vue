<template>
    <component :is="ConcreteComponent"
               :value="value" :path="path"
               :handlers="handlers"
               :type="type">
    </component>
</template>
<script>
    export default {
      name: 'PropertyEditor',
      props: ['value', 'type', 'path', 'handlers'],
      computed: {
        ConcreteComponent() {
          return require(`./${this.type}.vue`)
        },
      },
      created(){
        //console.log('pe idx',this.type,this.value,  this.path)
      }
    }
</script>