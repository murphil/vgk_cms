let moment = require('moment')
let chalk = require('chalk')
let fs = require('fs')
let NL = "\n"

class loggerFormatter {
  constructor (section, timer) {
    this.sec = section
    this.timer = timer
  }
  section() {
    return `-------------------|${this.sec}`
  }
  log(cmd, target, info) {
    return `${this.timer()}|${this.sec}|${cmd}|${info}|${target}`
  }
  warn(cmd, target, info) {
    return `${this.timer()}|${this.sec}|${cmd}|${info}|${target}`
  }
  info(info) {
    return `${this.timer()}|${this.sec}|INFO|${info}`
  }
  detail(cmd, target, info, detail) {
    return `${this.timer()}|${this.sec}|${cmd}|${info}|${target}|${detail}`
  }
}

class loggerConsoleFormatter extends loggerFormatter {
  section() {
    return (`${chalk.cyan(this.timer())}: 开始执行${chalk.green.bgBlack(this.sec)}任务！`)
  }
  log(cmd, target, info) {
    return `${chalk.black.bgCyan(this.timer())}: ${chalk.blue(cmd)} ${info} ${chalk.yellow(target)}`
  }
  warn(cmd, target, info) {
    return `${chalk.black.bgMagenta(this.timer())}: ${chalk.blue(cmd)} ${chalk.green(info)} ${chalk.yellow(target)}`
  }
  info(info) {
    return `${chalk.green(info)}`
  }
  detail(cmd, target, info, detail) {
    return `${chalk.black(this.timer())}: ${chalk.blue(cmd)} ${info} ${chalk.yellow(target)} ${detail}`
  }
}

class logWriter {
  constructor(...x) {
    this.x = x
  }
  commit (method, ...log) {
    for (let w of this.x) {
      w.tgt(w.fmt[method](...log))
    }
  }
}

let timer = () => {
  return moment().format('YYYYMMDD:hhmmss:SSS')
}

class FCLogger {
  constructor (logFile, fileLogger, consoleLogger) {
    this.writer = new logWriter(
      {
        tgt: x => fs.appendFileSync(logFile, x+NL),
        fmt: fileLogger
      },
      {
        tgt:console.log.bind(console),
        fmt: consoleLogger
      })
  }
  section() {
    this.writer.commit('section')
  }
  log(cmd, target, info) {
    this.writer.commit('log', cmd, target, info)
  }
  detail(cmd, target, info, detail) {
    this.writer.commit('detail', cmd, target, info, detail)
  }
  warn(cmd, target, info) {
    this.writer.commit('warn', cmd, target, info)
  }
  info(info) {
    this.writer.commit('info', info)
  }
}

let loggerFactory = ({location, section}) => {
  let fileLogger = new loggerFormatter(section, timer)
  let consoleLogger = new loggerConsoleFormatter(section, timer)
  return new FCLogger(location, fileLogger, consoleLogger)
}

module.exports = {
  loggerFactory
}