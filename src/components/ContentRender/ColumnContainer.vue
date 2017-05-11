<template>
    <div :id="id" class="ColumnContainer" :class="customStyle" :style="customCss">
        <slot></slot>
    </div>
</template>
<style>
    .ColumnContainer {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: stretch;
        flex: 1 1 auto;
    }
</style>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'ColumnContainer',
    mixins: [CR],
    data(){
      return {
        id: 'column-container-' + Math.random().toString().slice(2,11),
      }
    },
    beforeMount() {
      this.content.children.map(x => x.parent_id = this.id)
    },
    beforeUpdate() {
      this.content.children.map(x => x.parent_id = this.id)
    },
  }
</script>