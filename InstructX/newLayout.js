let D = require('./__defination.yml.json')
let path = require('path')
let {loggerFactory} = require('./vendor/utils/logger');
let {Instructs} = require('./vendor/index')
let LOGFILE = require('./vendor/utils/logfile')

let LS = name => `type: ${name}
header:
footer:
ads:
nav:
`
let LF = name => `<template>
    <div>
        <header>
            <slot name="header"></slot>
        </header>
        <div>
            <nav>
                <slot name="nav"></slot>
            </nav>
            <div>
                <slot></slot>
            </div>
            <aside>
                <slot name="ads"></slot>
            </aside>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<script>
  export default {
    name: '${name}',
    props: ['columns', 'layout'],
  }
</script>
<style>

</style>`

module.exports = function (name) {
  let logger = loggerFactory({
    location: LOGFILE,
    section: `创建${name}布局`
  })
  Instructs(logger)
    .newDir({
      name:'布局文件夹',
      target:path.join(D.frontEnd.components.ContentRender._, name) })
    .newFile({
      name: '布局文件',
      target: path.join(D.frontEnd.components.LayoutRender._, name) + '.vue',
      payload: LF(name) })
    .newFile({
      name: '布局脚本',
      target: path.join(D.upload.public.layout._, name) + '.yml',
      payload: LS(name) })
    .hintCmd({
      name: '重新布署前端',
      cmd: 'npm run dev/build',
      purpose: '重新布署前端' })
    .dealFile({
      name: '启动文件',
      target: path.join(D.frontEnd._, 'App.vue'),
      payload: '请求新布局'})
    .run()
}
