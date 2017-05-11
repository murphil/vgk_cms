<template>
  <div class="overlay" :class="customStyle" :style="customCss" :id="id">
      <slot></slot>
  </div>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'OverlayContainer',
    mixins: [CR],
    computed: {
      id() {
        return 'overlay-container-' + Math.random().toString().slice(2,11)
      },
    },
    beforeMount() {
      this.content.children.map(x => x.parent_id = this.id)
    },
    beforeUpdate() {
      this.content.children.map(x => x.parent_id = this.id)
    },
    mounted(){
      let children = this.$children
      let len = children.length
      for (let i = 0; i < len; i++){
        let node = children[i]
        node.$el.style.zIndex = len - i
      }
    }
  }
</script>
<style scoped>
    .overlay {
        display: flex;
        justify-content: center;
        align-items: stretch;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .overlay > * {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
</style>
