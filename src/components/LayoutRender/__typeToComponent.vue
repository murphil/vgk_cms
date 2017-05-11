<script>
import NotFound        from '../404.vue'

let vlf = process.env.VueLayoutFiles
let TypeComponentMap = {}
// webpack 传送数据的时候，总会把字符串转为标识符。临时先不传字符串;改为传整数，再转为字符串
let ext = {1: 'vue',2: 'js'}
for (let i in vlf) {
  if (vlf[i]) {
    TypeComponentMap[i] = require(`./${i}.${ext[vlf[i]]}`)
  }
}

function getComponent(k) {
  return TypeComponentMap[k] || NotFound
}

export default { getComponent }
</script>
