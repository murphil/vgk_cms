<script>
  import NotFound from './notFound.vue'
  import {objWalker} from '../../../utils/treeMap'

  let vcf = process.env.VueComponentFiles
  // webpack 传送数据的时候，总会把字符串转为标识符。临时先不传字符串;改为传整数，再转为字符串
  let ext = {1: 'vue',2: 'js'}
  objWalker(vcf, (k,v, path) => {
    if (v) {
      return require('.' + (path + '/' + k + '.' + ext[v]))
    }
  })

  function getComponent(type, layout) {
    if (type === 'test') { return require('../test')}
    let componentForLayout = vcf[layout] && vcf[layout][type]
    return componentForLayout || vcf[type] || NotFound
  }

  export default {getComponent}
</script>
