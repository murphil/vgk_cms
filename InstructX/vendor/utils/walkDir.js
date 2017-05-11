let path = require('path')
let fs = require('fs')
let walkDirSync = (dir, deal, res={}) => {
  for (let f of fs.readdirSync(path.resolve(dir))) {
    let pt = path.join(dir, f)
    if (fs.statSync(pt).isDirectory()) {
      res[f] = {}
      walkDirSync(pt, deal, res[f])
    } else {
      let {key, value} = deal(f, pt) || {}
      res[key] = value
    }
  }
  return res
}


module.exports = {
  walkDirSync
}