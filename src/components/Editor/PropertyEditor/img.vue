<template>
    <input :value="value" @input="changeProperty">
</template>
<script>
  import mix from '../mixin'
  export default {
    name: 'img',
    mixins: [mix]
  }
</script>