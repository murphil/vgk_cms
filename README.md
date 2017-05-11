# vgk_cms

> A Vue.js GraphQL Koa2 CMS

## git
```
# 本项目包含子模块，使用以下命令 clone
git --recursive clone https://coding.net/u/hefangxuan/p/TianPeng-x

# 然后把子项目切换到 master
cd InstructX
git checkout master

# 在已有项目中更新子模块
git submodule update --init --recursive
```

## Build Setup

``` bash
# 安装依赖
npm install

# 全局安装 knex
npm -g i knex

# 进行数据迁移/回滚
npm run migrate
npm run rollback

# 运行前端热更新服务器
npm run dev

# 运行后端服务器
npm run server

# 开发环境需同时开启前后端服务器，使用如下命令同时运行上两条
npm run all

# 构建前端 
npm run build

```

## 脚手架
```
#可以通过npm执行
npm run x -- cmd args...
#也可以直接执行
node --harmony scaffold/index.js cmd args...

#例如
npm run x -- uc main #更新main栏目内容
```

- 命令定义在 `scaffold/index.js` 文件中，目前支持的命令有：
  - `nl/newLayout <name>`
  - `nc/newComponent <name>`
  - `uc/updateContent <uri>`
    - `<uri>` 指定更新条目的uri
    - 更新内容对应 `scaffold/content` 目录下的`<uri>.yml` 文件
    - 更新的字段在 `scaffold/updateDBContent.js` 文件中通过指令的 payload 指定
    - 含有数据库操作的命令，由于引用了Knex会保持连接，需要手动`Ctrl+C`关闭
- 具体执行由 `scaffold/` 目录下的相关文件完成
- 相关信息除在控制台显示外，也会记录到 `scaffold/scaffold.log` 文件。
  - 有时候控制台输出不好找的情况下，可以直接查看该文件
- 脚手架指令定义在 `utils/scaffoldOp.js` 等文件中，可以定义多套指令集



## 编码规范

### 样式
#### 给组件传入指定类
- `style` 中使用 `.FILENAME` 定义默认样式
- 用户样式定义在 `uploads/public/styleSheet/LayoutXXX` 文件夹中
  - css 文件中使用 `@top` 代表当前类名
  - 放在组件类名文件夹中的是组件的样式。类名为 `.文件夹名.用户类名`
  - 外面是的全局的，也可以应用到组件上，优先级更低。类名为 `.用户类名`
- 上面出现的 **FILENAME** 必须与文件名相同。因为：
  - 组件注册是自动扫描组件目录，把文件名作为组件名，文件内容作为组件
  - 分派组件的时候根据用户脚本中组件的 `type` 字段来查找组件，所以该字段的内容应与文件名相同
  - 后端查找样式文件的时候，需要解析用户脚本，有 `style` 字段的则根据 `type` 字段的信息查找文件
    - 用户样式放在 `uploads/public/styleSheet/LayoutXXX`，组件样式需要 `type` 信息作为目录名
  - 找到后，需要 `type` 字段的内容来替换 `@top` 变量。也就是说，最终下载的样式，类名与 `type` 字段一致
  - 因为`type`与文件名一致，所以 `this.content.style` 中的前缀要与文件名一致
    
  

### 前端

`src/components/ContentRender` 目录下
  - `__index.vue` 是 `ContentRender` 组件本身，这个通常不需要改动
  - `__typeToComponent.vue` 用来注册组件
  - 不同布局的非共用组件单独放入一个文件夹中
  - 首字母大写的是容器组件
    - 应写好相应的 flex 布局
  - 小写的是普通组件
    - 在此定义外观样式
  - 依赖的其它组件在放到子目录下
  - 如果需要传入数据的话，接收 'content' 这个 props 即可，其内容为用户脚本中定义的对象
    - 需要对组件指定样式，使用 props.css
    - 需要对组件指定css类，使用 props.style
      - 这种情况下须设置默认样式，例如：
          ```
          markdownStyle () {
            return 'markdown-' + (this.content.style || 'default')
          }
          ```
    - 其它的参数都可以放在 content 这个 props 里面

`src/components/LayoutRender` 目录下
  - `__index.vue` 是 `LayoutRender` 组件本身，这个通常不需要改动
  - `__typeToComponent.vue` 用来注册组件
  - 首字母大写的是布局组件（也是容器组件）
    - 布局样式应写在此文件中
    - 尽量使用 flex 布局
  - 小写的是普通组件（如果有的话）
  - 依赖的其它组件在放到子目录下
  - 为布局添加字段，需要改动
    - 在后台 `graphql/ResourceType.js` 中的 `layoutType` 定义添加字段
    - `src/components/LayoutRender/XXX.vue` 中添加 slot 位置
    - `src/components/LayoutRender/__index.vue` 定义 slot
    - `src/store/actions.js` 中GraphQL请求结果中添加字段
    - `uploads/public/layout/XXX.yml` 中定义内容
  - 添加新的布局，执行脚手架 `npm run x -- nl XXX`

样式
 - 容器组件尽量不引用外部样式
 - 组件中尽量不要使用 scoped style


`src/components/test` 用来测试组件，并不包含在 git 版本库中

### 后端

与其它系统协商身份验证时，用户的认证信息（如 Cookie）存储在 `_user` 表中的 `attributes::JSONB` 字段中

与其它系统交互的业务，应写在 `server/external/XXX` 中，尽量减少依赖

### 问题
###### 布局中的栏目列表不显示内容
在正文中指定相同的栏目列表，并设置CSS样式为 `display: none`

###### 在 ContentRender 的子组件中引用 ContentRender
```
beforeCreate: function () {
  this.$options.components.ContentRender = require('./index.vue')
}
```

