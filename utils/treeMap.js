function treeMap(node, callback, parent = null, child = 'children', path='') {
  let newNode = {}
  let res = callback(node, parent, path)
  for (let x in res) {
    if (res.hasOwnProperty(x)) {
      newNode[x] = res[x]
    }
  }
  if (node[child] && node[child].length > 0) {
    for (let i in node[child]) {
      if (node[child].hasOwnProperty(i)){
        newNode[child][i] = treeMap(node[child][i], callback, parent = newNode, child, path+'/'+i)
      }
    }
  }
  return newNode
}

function treeEach(node, callback, parent = null, child = 'children', path='') {
  let res = callback(node, parent, path)
  for (let x in res) {
    if (res.hasOwnProperty(x))
      node[x] = res[x]
  }
  if (node[child] && node[child].length > 0) {
    for (let i in node[child]) {
      if (node[child].hasOwnProperty(i)){
        treeEach(node[child][i], callback, parent = node, child, path+'/'+i)
      }
    }
  }
}

function buildTree(nodeList, nid = 'id', pid = 'parent_id', child = 'children', wht = 'weight') {
  let sortL = nodeList.sort((x, y) => {
    let res =  x[pid] - y[pid]
    if (res === 0) {
      return y[wht] - x[wht]
    } else {
      return res
    }
  })
  let root = sortL[0]
  let rest = sortL.slice(1)
  for (let i of rest) {
    treeEach(root, (node, parent) => {
      if (i[pid] === node[nid]) {
        if (!node[child]) {
          node[child] = []
        }
        node[child].push(i)
        //return node
      }
    })
  }
  return root
}

function objWalker(obj, cb, path='') {
  for (let i in obj) {
    if (typeof obj[i] === 'object' ) {
      objWalker(obj[i], cb, `${path}/${i}`)
    } else {
      obj[i] = cb(i, obj[i], path)
    }
  }
}

module.exports = {
  treeEach,
  treeMap,
  buildTree,
  objWalker
}

