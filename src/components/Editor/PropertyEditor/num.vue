<template>
    <input :value="value" @input="changeProperty" type="number"/>
</template>
<script>
  import mix from '../mixin'
  export default {
    name: 'num',
    mixins: [mix]
  }
</script>