<template>
    <input :value="value" @input="changeProperty"/>
</template>
<script>
  import mix from '../mixin'
  export default {
    name: 'title',
    mixins: [mix]
  }
</script>