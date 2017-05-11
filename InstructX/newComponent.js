let {Instructs} = require('./vendor/index')
let {loggerFactory} = require('./vendor/utils/logger')
let D = require('./__defination.yml.json')
let path = require('path')
let LOGFILE = require('./vendor/utils/logfile')

let CR = name => `<template>
  <div class="${name}" :class="customStyle" :style="customCss">
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name: '${name}',
    props: ['content'],
    computed: {
      customStyle () {
        return this.content.style
      },
      customCss () {
        return this.content.css
      },
    }
  }
</script>
<style>
  .${name} {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    font-size: 12px;
  }
</style>
`

module.exports = function (name) {
  let logger = loggerFactory({
    location: LOGFILE,
    section: `新建${name}组件`
  })
  Instructs(logger)
    .newFile({
      name: 'Vue组件',
      target: path.join(D.frontEnd.components.ContentRender._, name)+'.vue',
      payload: CR(name) })
    .hintCmd({
      name: '重新部署前端',
      cmd: 'npm run dev/build',
      purpose: '重新布署前端'
    })
    .run()

}