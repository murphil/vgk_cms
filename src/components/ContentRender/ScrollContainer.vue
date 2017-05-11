<template>
    <Scroll class="ScrollContainer"
            :class="customStyle"
            :style="customCss"
            :content="content">
        <slot></slot>
    </Scroll>
</template>
<script>
import Vue from 'vue'
let Scroll = Vue.component('Scroll', {
  props: {
    content:{
      type: Object
    }
  },
  mounted: function () {
    /*
    let slots = this.$slots.default
    for (let i = 0; i < slots.length; i++) {
      let el = slots[i].elm
      let pel = el.parentElement
      pel.style.background = el.style.background
      el.style.background = ''
      console.log(pel)
    }
    */
  },
  render: function (createElement) {
    let wrapSlots = this.$slots.default
      /*
      .map(x=>{
        return createElement(
          'div',
          {
            class: 'scw-opacity'
          },
          [x]
        )
      })
      */
    return createElement(
      'div',
      wrapSlots
    )
  }
})
import CR from '../../utils/CRMixin'
export default {
  name: 'ScrollContainer',
  mixins: [CR],
  components:  {Scroll},
}
</script>
<style>
    .ScrollContainer {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        flex: 1 1 100%;
    }
    .ScrollContainer > * {
        /*
        padding: 1em 10em;
        */
    }
    .ScrollContainer > *:nth-child(2n) {
        /*
        background: rgba(51,60,63,0.7);
        */
    }
    .ScrollContainer > *:nth-child(2n+1) {
        /*
        background: rgba(251,260,263,0.7);
        */
    }
</style>
