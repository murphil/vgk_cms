const yaml = require('js-yaml')
const fs = require('fs')

function loadYaml(p) {
  return yaml.safeLoad(fs.readFileSync(p, 'utf8'))
}

module.exports = {
  loadYaml
}