let {privilege, requiredPrivileges} = require('./privilege')
let {expect} = require('chai')

// use case
// 在模型层定义
let privilegeGenerator = privilege(
  async(user, privileges) => true,   // 验证权限
  async user => ({                   // 获取用户群组
    user: 'some others',             // 返回对象中不要设置 user 成员，设置了也会被覆盖
    group: 'g',
    downstream: [user, 'v', 'w']
  })
)
// 在业务层定义用户信息获取方式
let privilegeForUser = privilegeGenerator((...x) => x[0])
// 控制器
let privilegeController = privilegeForUser(['a', 'b', 'c'])((...x) => {
  // 实际执行的业务逻辑
  return [...x]
}, (x)=>{console.log(x)})
// 由框架调用控制器
privilegeController('u', 1, 2, 3)
  .then(x=>{
    let exp = [ 'u', 1, 2, 3, { user: 'u', group: 'g', downstream: [ 'u', 'v', 'w' ] } ]
    let res = expect(x).to.be.deep.equal(exp)
    console.log(res)
  })

privilege(x=>false, x=>true)(x=>x)(['a'])(x=>console.log('y',x),x=>console.log('n',x))(1)

//
expect(requiredPrivileges('a', 'c','e').verify(['a', 'b', 'c','e'])).to.be.equal(true)
expect(requiredPrivileges('a').verify(['a'])).to.be.equal(true)
expect(requiredPrivileges('a').verify(['b'])).to.be.equal(false)
expect(requiredPrivileges('b').verify([])).to.be.equal(false)
expect(requiredPrivileges().verify([])).to.be.equal(true)
expect(requiredPrivileges().verify(['a'])).to.be.equal(true)
expect(requiredPrivileges().verify()).to.be.equal(true)
expect(requiredPrivileges('a', 'c','e').verify(['a', 'b', 'c'])).to.be.equal(false)