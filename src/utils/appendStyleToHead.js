module.exports = function (style) {
  let s = ''
  for (let i in style) {
    s = `${s}\n${style[i]}\n`
  }
  let dom = document.createElement('style')
  dom.innerHTML = s
  document.head.appendChild(dom)
}

