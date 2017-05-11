<template>
  <div :style="customCss" class="BlockContainer" :class="customStyle">
    <slot></slot>
  </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'BlockContainer',
    mixins: [CR],
  }
</script>
<style>
  .BlockContainer {
    padding: 1em 10em 1em 10em;
  }
</style>
