class UrlPath {
  constructor(pathString) {
    if (!pathString > 0) {
      throw new Error(`not a path: ${this.path}`)
    } else {
      let path = pathString.split('/')
      let first = path[0]
      let last = path[path.length - 1]
      if (first === "" && last === "") {
        this.abs = true
        this.dir = true
        this.path = path.slice(1, path.length - 1)
      } else if (first === "") {

        this.abs = true
        this.dir = false
        this.path = path.slice(1)
      } else if (last === "") {
        this.abs = false
        this.dir = true
        this.path = path.slice(0, path.length - 1)
      } else {
        this.abs = false
        this.dir = false
        this.path = path
      }
    }
  }

  toString() {
    if (this.absolute) {
      let res = []
      for (let i of this.path) {
        res.push(i)
      }
      res.unshift("")
      return res.join('/')
    } else {
      return this.path.join('/')
    }
  }

  last() {
    return this.path[this.path.length - 1]
  }

  category(columns, treeEach) {
    let category = null
    treeEach(columns, (node) => {
      if (node.uri === this.last()){
        category = true
      }
    })
    if (category){
      return {
        column: this.last(),
        article: null
      }
    } else {
      return {
        column: this.path[this.path.length - 2],
        article: this.last()
      }
    }
  }
}

let toUrlPath = function (s) {
  return new UrlPath(s)
}

module.exports = {toUrlPath}

