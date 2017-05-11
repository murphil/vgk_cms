#InstructX

```
#可以通过npm执行
npm run x -- cmd args...
#也可以直接执行
node --harmony cmd/index.js cmd args...

#例如
npm run x -- t X #测试
```

- 命令定义在 `cmd/index.js` 文件中，目前支持的命令有：
  - `t/test <name>`
    - 含有数据库操作的命令，引用了连接管理器的时候会保持连接，需要手动`Ctrl+C`关闭
- 具体执行由 `cmd/` 目录下的相关文件完成
- 相关信息除在控制台显示外，也会记录到 `log/cmd.log` 文件。
  - 有时候控制台输出不好找的情况下，可以直接查看该文件
- 指令定义在 `operations` 文件夹中，可以定义多套指令集
  - `base.js` 是默认加载的