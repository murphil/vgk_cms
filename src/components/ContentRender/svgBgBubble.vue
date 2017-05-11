<template>
  <g class="svgBgBubble"
     :class="customStyle"
     :style="customCss">
    <defs>
      <radialGradient id="svgBgBubble">
        <stop offset="0%" stop-color="rgba(191,200,203,0.8)"/>
        <stop offset="30%" stop-color="rgba(191,200,203,0.8)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
    </defs>
    <circle v-for="i in circles"
            fill="url(#svgBgBubble)"
            :ref="i.id"
            :r="i.r"
            :cx="i.cx"
            :cy="i.cy"/>
  </g>
</template>
<script>
  import CR from '../../utils/CRMixin'
  export default{
    name: 'svgBgBubble',
    mixins: [CR],
    computed: {
      svg() {
        return this.$parent.$parent.$data.svg || {width: 800, height: 600}
      },
      num () {
        return this.content.num || 10
      },
      circles(){
        let r = this.content.r || 30
        let res = []
        for (let i = 0; i < this.num; i++){
          res.push({
            id: `bubble-${i}`,
            r: Math.floor(r * Math.random() + 3),
            cx: Math.floor(this.svg.width * Math.random()),
            cy: Math.floor(this.svg.height * Math.random())
          })
        }
        return res
      },
    },
    mounted(){
      for (let i = 0; i < this.num; i++){
        let r = this.$refs[`bubble-${i}`][0]
        r.classList.add('bubbleMove')
      }
    }
  }
</script>
<style>
  .svgBgBubble {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    font-size: 12px;
  }

  .svgBgBubble .bubbleMove {
    transition: all 30s;
  }
</style>
