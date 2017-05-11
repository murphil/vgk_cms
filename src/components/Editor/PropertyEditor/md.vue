<template>
    <textarea :value="value" @input="changeProperty"/>
</template>
<script>
  import mix from '../mixin'
  export default {
    name: 'md',
    mixins: [mix]
  }
</script>