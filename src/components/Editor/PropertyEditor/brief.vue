<template>
    <input type='checkbox' :checked="value" @change="changeProperty" />
</template>
<script>
  import {props} from '../mixin'
  export default {
    name: 'brief',
    props,
    methods: {
      changeProperty(e) {
        this.handlers.changeProperty({
          type: this.type,
          value: e.target.checked,
          path: this.path
        })
      }
    }
  }
</script>