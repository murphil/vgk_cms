<template>
    <div class="property-editor-css">
        <div v-for="(v, k) in obj">
            <label>{{k}}</label>
            <input :value="v"
                   @input="function(e){changeProperty(k,e)}">
        </div>
    </div>
</template>
<script>
  import {props, methods} from '../mixin'
  export default {
    name: 'css',
    props,
    data() {
      return {
        obj: this.value
      }
    },
    methods: {
      changeProperty(k,e){
        this.obj[k] = e.target.value
        this.handlers.changeProperty({
          type: this.type,
          value: this.obj,
          path: this.path
        })
      }
    }
  }
</script>