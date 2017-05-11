import Vue from 'vue'

let InFrame = Vue.component('InFrame', {
  beforeCreate(){
    this.$options.components.ContentRender = require('../ContentRender/index.vue')
  },
  render: function (createElement) {
    let srcdoc = createElement(
      this.$options.components.ContentRender, {
        props: {
          content: this.content
        }
      }
    )
    //TODO: 此处要求 srcdoc 为 html 字符串。现在只能返回 VNode 对象，不能转换为 html
    //console.log(srcdoc)
    let ifm = createElement(
      'iframe', {
        attrs: {
          srcdoc
        }
      }
    )
    return createElement(
      'div', [
        srcdoc
      ]
    )
  },
  props: {
    content: {
      type: Object,
    }
  }
})

module.exports = {
  InFrame
}