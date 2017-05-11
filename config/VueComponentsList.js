let path = require('path')
let {walkDirSync} = require('../utils/dirWalker')
let crp = path.resolve(path.join('.', 'src', 'components', 'ContentRender'))
let lop = path.resolve(path.join('.', 'src', 'components', 'LayoutRender'))
function vueFiles(dir) {
  let m = {
    'vue': 1,
    'js':2
  }
  return walkDirSync(dir , (x, d) => {
    if (/.+\.(vue|js)$/.test(x)
      && ['__typeToComponent.vue'].indexOf(x) < 0){
      let name = path.basename(x).split('.')
      let ext = name.splice(-1)
      return {
        key: name.join('.'),
        value: m[ext[0]]
      }
    }
  })
}
let VueComponentFiles = vueFiles(crp)
let VueLayoutFiles = vueFiles(lop)

module.exports = {
  VueComponentFiles,
  VueLayoutFiles
}