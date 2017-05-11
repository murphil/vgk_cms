<template>
  <div :id="id" class="RowContainer" :class="customStyle" :style="customCss">
    <slot></slot>
  </div>
</template>
<style>
  .RowContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: space-around;
    flex: 1 1 100%;
  }
</style>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'row_container',
    mixins: [CR],
    data(){
      return {
        id: 'row-container-' + Math.random().toString().slice(2,11),
      }
    },
    beforeMount() {
      this.content.children.map(x => x.parent_id = this.id)
    },
    beforeUpdate() {
      this.content.children.map(x => x.parent_id = this.id)
    }
  }
</script>
