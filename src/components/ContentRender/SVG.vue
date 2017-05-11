<template>
    <svg class="SVG"
         :class="customStyle"
         :style="customCss"
         :width="svg.width"
         :height="svg.height"
         ref="svg">
        <slot/>
    </svg>
</template>
<script>
  import {select as d3select, mouse as d3mouse} from 'd3-selection'

  function throttleWithRAF(fn) {
    let running = false
    return function () {
      if (running) return
      running = true
      window.requestAnimationFrame(() => {
        fn.apply(this, arguments)
        running = false
      })
    }
  }

  import CR from '../../utils/CRMixin'
  export default{
    name: 'SVG',
    mixins: [CR],
    computed: {
      id() {
        return 'SVG-container-' + Math.random().toString().slice(2,11)
      }
    },
    data() {
      let x = document.body.clientWidth * (this.content.width || 1)
      let y = document.body.clientHeight * (this.content.height || 1)
      return {
        svg : {
          width: x,
          height: y
        },
        currentMax: 0,
      }
    },

    mounted () {
      let d = document.getElementById(this.content.parent_id)
      let {width, height} = d ? d.getBoundingClientRect() : {
          width  :document.body.clientWidth,
          height :document.body.clientHeight
      }
      this.setBounding(width, height)

      d3select(this.$refs.svg).on('mousemove', this.onMouseMove)
    },

    methods: {
      onMouseMove () {
        const [x, y] = d3mouse(this.$refs.svg)
        this.update(x, y)
      },

      update: throttleWithRAF(function (x, y) {
        //console.log(x,y)
      }),

      setBounding(w,h) {
        this.svg.width = w
        this.svg.height = h
      }
    },

    updated(){
      //console.log('svg updated')
    }
  }
</script>
<style>

</style>
