<template>
  <div class="TitleContainer" :class="customStyle" :style="customCss">
    <div v-if="content.title" class="title-header">
      {{content.title}}
    </div>
    <slot></slot>
  </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'TitleContainer',
    mixins: [CR],
  }
</script>
<style>
  .TitleContainer {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 0 0 auto;
    padding: 1em;
    font-size: 16px;
  }
  .TitleContainer .title-header{
    margin-bottom: 1em;
    font-size: 1.5em;
  }

</style>
