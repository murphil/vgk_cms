<template>
    <div class="property-editor-style">
        <input :value="v"
               @input="function(e){changeProperty(i,e)}"
               v-for="(v,i) in list">
    </div>
</template>
<script>
  import {props, methods} from '../mixin'
  export default{
    name: 'style',
    props,
    data() {
      return {
        list: this.value
      }
    },
    methods: {
      changeProperty(i,e){
        this.list[i] = e.target.value
        this.handlers.changeProperty({
          type: this.type,
          value: this.list,
          path: this.path
        })
      }
    }
  }
</script>
<style>
    .property-editor-style {
        display: flex;
        flex-flow: row wrap;
        flex: 1 1 auto;
    }
    .property-editor-style input {
        flex:  1 1 auto;
        width: auto;
    }
</style>