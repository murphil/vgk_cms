function listGroup(key, list) {
  let res = {}
  for (let i of list) {
    let k = i[key]
    if (! res[k]){ res[k] = [] }
    res[k].push(i)
  }
  return res
}

module.exports = {
  listGroup
}

/*
let a = [{name: 1, x:2}, {name:2, x:3}, {name:3}, {name:3, x:4}]
console.log(listGroup('name',a ))
*/
