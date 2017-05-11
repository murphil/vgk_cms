export default {
  props: ['content', 'recursion'],
  computed: {
    customStyle () {
      return this.content.style
    },
    customCss () {
      return this.content.css
    },
  },
  beforeCreate () {
    this.$options.components.ContentRender = require('../components/ContentRender/index.vue')
  },
}