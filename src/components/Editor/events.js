import {getNode, eraseNode, insNode, realPath} from '../../utils/modTreeNode'

function dragNode(obj, target, source) {
  let t = realPath(target)
  let tz = parseInt(t.splice(-1)[0])
  let s = realPath(source)
  let sz = parseInt(s.splice(-1)[0])
  let cond = t.join('/') === s.join('/') && tz - 1 === sz
  if (target.startsWith(source) && target !== source) {
    alert(`不能把元素拖拽到它的子元素中去!\n\t[target:${target}, source:${source}]`)
  } else if (target === source || cond) {
  } else {
    let {to, from, holder} = eraseNode(obj, source)
    insNode(obj, target, to)
    let ix = from.indexOf(holder)
    from.splice(ix, 1)
  }
}

module.exports = {
  editNode(path) {
    console.log('ev.editNode ', this.uuid, path)
    this.currPath = path
  },
  changeProperty({path, type, value}) {
    let x = getNode(this.draft, path)
    this.$set(x,type,value)
  },
  dragSrc (src) {
    this._dragSrc = src
  },
  dragNode({target, source}) {
    console.log('ev.dragNode ', this.uuid, target, source)
    source = this._dragSrc
    dragNode(this.draft, target, source)
  },
  insertNode(target) {
    console.log('ev.insertNode ', this.uuid, target)
    insNode(this.draft, target, {
      type: "RowContainer",
      children: []
    })
  }
}