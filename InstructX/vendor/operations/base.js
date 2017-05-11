let fs = require('fs')
let {walkDirSync} = require('../utils/walkDir')

let throwFileExist = (i, logger, cmd, r) => {
  if (fs.existsSync(i.target)){
    throw Error('file exists')
  }
  return r
}

let throwFileNonExist = (i, logger, cmd, r) => {
  if (!fs.existsSync(i.target)){
    throw Error('file don\'t exists')
  }
  return r
}

module.exports = {
  writeFile: {
    tag: '写入文件',
    before: throwFileNonExist,
    resolve: (i, logger, tag)=> {
      logger.log(tag, i.target, i.name)
      fs.writeFileSync(i.target, i.payload)
    }
  },
  newDir: {
    tag: '新建文件夹',
    before: throwFileExist,
    resolve: (i, logger, tag)=> {
      logger.log(tag, i.target, i.name)
      fs.mkdirSync(i.target)
    }
  },
  walkDir: {
    tag: '遍历文件夹',
    resolve: (i, logger, tag) => {
      logger.log(tag, i.target, i.name)
      // 此处返回值可以作为后续函数的第4个参数。最近的是同指令中的 after
      return walkDirSync(i.target, (file, fullpath) => i.doEach(file, fullpath, logger, [tag, i.target, i.name]))
    }
  },
  newFile: {
    tag: '新建文件',
    before: throwFileExist,
    resolve: (i, logger, tag)=> {
      logger.log(tag, i.target, i.name)
      fs.writeFileSync(i.target, i.payload)
    }
  },
  dealFile: {
    tag: '处理文件',
    before: throwFileNonExist,
    resolve: (i, logger, tag)=> {
      logger.info(`请处理 ${i.target}，${i.payload}`)
    }
  },
  hintCmd: {
    tag: '执行命令',
    resolve: (i, logger, tag) => {
      logger.info(`${i.name}: 请运行 ${i.cmd}, ${i.purpose}`)
    }
  }
}