<template>
    <input :value="value" @input="changeProperty"/>
</template>
<script>
    import mix from '../mixin'
  export default {
    name: 'category_uri',
    mixins: [mix]
  }
</script>