<template>
    <g>
        <text v-if="layout.data.type"
              :x="posX" :y="posY"
        >
            {{layout.data.type}}
        </text>

    </g>
</template>
<script>
    export default {
      name: 'SVGNode',
      props: ['layout'],
      data(){
        return {
          posX : 1,
          posY : 1
        }
      }
    }
</script>