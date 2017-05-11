module.exports = {
  props: ['value', 'type', 'path', 'handlers'],
  methods: {
    changeProperty(e) {
      this.handlers.changeProperty({
        type: this.type,
        value: e.target.value,
        path: this.path
      })
    }
  }
}
