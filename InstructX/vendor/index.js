let OP = require('./operations/base')

class Instruct {
  constructor(logger, op){
    this.logger = logger
    this.instructs = []
    this.operation = {}
    this.appOperation(op)
  }
  appOperation(op){
    for (let o in op){
      this.operation[o] = op[o]
      this[o] = x => {
        x.op = o
        this.instructs.push(x)
        return this
      }
    }
    return this
  }
  setLogger(logger){
    this.logger = logger
    return this
  }
  setStart(start) {
    this.start = start
    return this
  }
  setSummary(summary) {
    this.summary = summary
    return this
  }
  async run(){
    this.logger.section()
    if (this.start) { console.log(this.start) }
    let error = null
    let result = null
    for (let i of this.instructs) {
      let opi = this.operation[i.op]
      if (!error){
        try {
          if (opi.before) { result = await opi.before(i, this.logger, opi.tag, result) }
          if (opi.resolve) { result = await opi.resolve(i, this.logger, opi.tag, result) }
          if (opi.after) { result = await opi.after(i, this.logger, opi.tag, result) }
        } catch (err){
          error = [ opi.tag, i.target, err.message]
        }
      }
    }
    if (!error) {
      if (this.summary) {this.logger.info(this.summary)}
    } else {
      this.logger.warn(...error)
    }
  }
}

let Instructs = (logger) => new Instruct(logger, OP)

module.exports = {
  Instructs,
}