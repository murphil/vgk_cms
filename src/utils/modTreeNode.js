function _get(obj, path) {
  let tmp = obj
  for (let i of path){
    if (tmp && tmp.children && tmp.children[i]) {
      tmp = tmp.children[i]
    } else {
      console.log(`getTreeNode:: path:${path}, currPath:${i},`,
        'node:',obj,
        'currNode:', tmp)
    }
  }
  return tmp
}

function realPath(pathStr) {
  return pathStr.split('/').slice(1)
}

function getNode(obj, path) {
  return _get(obj, realPath(path))
}

function eraseNode(obj, path) {
  let p = realPath(path)
  let z = p.splice(-1)[0]
  let tmp = _get(obj, p)
  let to = tmp.children[z]
  let holder = {type: "erased!!!"}
  tmp.children.splice(z, 1, holder)
  return {to, holder, from: tmp.children}
}

function insNode(obj, path, el) {
  let p = realPath(path)
  let z = p.splice(-1)[0]
  let tmp = _get(obj, p)
  tmp.children.splice(z, 0, el)
}

module.exports = {
  getNode, eraseNode, insNode, realPath
}
