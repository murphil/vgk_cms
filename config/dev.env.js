var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
let {VueComponentFiles, VueLayoutFiles} = require('./VueComponentsList')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VueComponentFiles,
  VueLayoutFiles
})
