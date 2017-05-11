<template>
    <select @input="changeProperty">
        <option v-for="i in componentList"
                :selected="value === i ? 'selected' : ''"
                :value="i">{{i}}
        </option>
    </select>
</template>
<script>
  import {props, methods} from '../mixin'
  import {objWalker} from '../../../../utils/treeMap'
  let vcf = process.env.VueComponentFiles
  let componentList = []
  objWalker(vcf, (k, v) => {
    componentList.push(k)
  })

  export default{
    name: 'type',
    props,
    data() {
      return {
        componentList
      }
    },
    methods
  }
</script>