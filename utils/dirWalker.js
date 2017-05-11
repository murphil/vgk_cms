let fs = require('fs')
let path = require('path')

// 对于文件夹的遍历对于顺序往往是有要求的，这种情况下，异步模式本身就无法满足其要求
// dirWalker 和 walkDir 仅做为实验，实际应用中不推荐
let dirWalker = (p, cb) => {
  fs.readdir(path.resolve(p), (err, files) => {
    for (let f of files) {
      let pt = path.join(p, f)
      fs.stat(pt, (e, fstat) => {
        if (fstat.isDirectory()) {
          cb(pt, true)
          dirWalker(pt, cb)
        } else {
          cb(pt)
        }
      })
    }
  })
}
let walkDir = (p, cb, ret) => {
  let res = {}
  dirWalker(p, (f, isDir) => {
    cb(f,isDir)
    res[f] = f
    ret(res)
  })
}

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
