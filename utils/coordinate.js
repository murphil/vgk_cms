class Coordinate {
  constructor(w, h) {
    this.w = w
    this.h = h
  }

  L(x, y) {
    return [x * this.w / 100, this.h - y * this.h / 100]
  }

  X(x, y) {
    return [(x + 100) * this.w / 200, this.h / 2 - y * this.h / 200]
  }

  O(u, v) {
    let deg = u * Math.PI * 2 / 360
    let x = Math.cos(deg) * v
    let y = Math.sin(deg) * v
    return [...this.X(x, y)]
  }

  canvas() {
    return [this.w, this.h]
  }

  S(x,y) {
    return [this.w * x /100, this.h * y /100]
  }
}

let coordinate = (w, h) => {
  return new Coordinate(w, h)
}

module.exports = coordinate