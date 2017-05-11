<template>
  <div>
    {{content.payload}}
  </div>
</template>
<style>

</style>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'plainText',
    mixins: [CR],
  }
</script>
