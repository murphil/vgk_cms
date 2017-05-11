const {
  GraphQLObjectType
  , GraphQLString
} = require('graphql')
const GraphQLJSON = require('graphql-type-json')
const path = require('path')
const fs = require('fs')
const treeEach = require('../../utils/treeMap').treeEach
const {loadYaml} = require('../../utils/yml')

let layoutType = new GraphQLObjectType({
  name: 'Layout',
  fields: {
    'type': {type: GraphQLString},
    'header': {type: GraphQLJSON},
    'footer': {type: GraphQLJSON},
    'modal': {type: GraphQLJSON},
    'nav': {type: GraphQLJSON},
    'ads': {type: GraphQLJSON},
    'styles': {type: GraphQLJSON}
  }
})

let uploadPath = path.resolve(__dirname, '..', '..', 'uploads')
let stylePath = path.resolve(uploadPath, 'public', 'styleSheet')
let publicStylePath = path.resolve(uploadPath, 'public', 'publicStyle')
let fetchStylesheet = (content, styleSheet, layout) => {
  let styleSheets = {}
  let clientStyles = styleSheet.split(',')
  treeEach(content, (node) => {
    if (node['style'] && typeof node['style'] === 'object' && node['style'].length > 0) {
      for (let s of node['style']) {
        let styleName = `${node['type']}+${s}`
        // 如果本次查找结果中没有
        if (!styleSheets[styleName]) {
          // 客户端没有组件样式
          if (clientStyles.indexOf(styleName) < 0) {
            //查找组件CSS类
            let localCssFile = path.join(stylePath, layout, node['type'], s) + '.css'
            let publicLocalCssFile = path.join(publicStylePath, node['type'], s) + '.css'
            if (fs.existsSync(localCssFile)) {
              styleSheets[styleName] = fs.readFileSync(localCssFile, 'utf-8').replace(/@top/g, `.${node['type']}.${s}`)
            } else if (fs.existsSync(publicLocalCssFile)) {
              styleSheets[styleName] = fs.readFileSync(publicLocalCssFile, 'utf-8').replace(/@top/g, `.${node['type']}.${s}`)
            }
          }
          // 客户端没有全局样式
          if (clientStyles.indexOf(s) < 0) {
            //查找全局CSS类
            let globalCssFile = path.join(stylePath, layout, s) + '.css'
            let publicGlobalCssFile = path.join(publicStylePath, s) + '.css'
            if (fs.existsSync(globalCssFile)) {
              styleSheets[s] = fs.readFileSync(globalCssFile, 'utf-8').replace(/@top/g, `.${s}`)
            } else if (fs.existsSync(publicGlobalCssFile)) {
              styleSheets[s] = fs.readFileSync(publicGlobalCssFile, 'utf-8').replace(/@top/g, `.${s}`)
            }
          }
        }
      }
    }
  })
  return styleSheets
}

let layoutPath = path.resolve(uploadPath, 'public', 'layout')
let layout = {
  type: layoutType,
  args: {
    'name': {type: GraphQLString}
  },
  resolve: (root, x) => {
    let layout = loadYaml(path.resolve(layoutPath, `${x.name}.yml`))
    let styles = {}
    for (let i in layout) {
      if (typeof layout[i] === 'object') {
        let ss = fetchStylesheet(layout[i], '', x.name)
        for (let s in ss) {
          if (!styles[s]) {
            styles[s] = ss[s]
          }
        }
      }
    }
    layout.styles = styles
    return layout
  }
}


module.exports = {
  layout, fetchStylesheet
}