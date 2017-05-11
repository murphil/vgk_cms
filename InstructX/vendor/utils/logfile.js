let fs = require('fs')
let path = require('path')

let LOGFILE_DIR = path.join( 'log')
let LOGFILE = path.join(LOGFILE_DIR, 'cmd')

if (!fs.existsSync(LOGFILE_DIR)) {
  fs.mkdirSync(LOGFILE_DIR)
}
if (!fs.existsSync(LOGFILE)) {
  fs.writeFileSync(LOGFILE, '', 'utf8')
}

module.exports = LOGFILE