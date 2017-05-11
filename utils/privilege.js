let privilege = (auth, getGroup) => getUser => privileges => (resolve, reject) => async(...x) => {
  // 函数 resolve 表示后续操作，也就是实际的业务逻辑
  let user = await getUser(...x)
  // 根据 user 和 privileges 验证用户能否进行后续操作
  // 实际的验证由 auth 函数完成
  let canDo = await auth(user, privileges)
  if (canDo) {
    // 如果用户可以进行后续操作，则查询用户所属群组及其下级群组，然后附加到 resolve 参数列表的末尾
    // 实际的群组查询由 getGroup 函数完成
    let group = await getGroup(user)
    // 把用户信息也注入到 group 对象中
    group.user = user
    return await resolve(...x, group)
  } else {
    if (typeof reject === 'function') {
      return await reject(...x, user, privileges)
    }
  }
}



class PrivilegeCombinator {
  constructor(...x) {
    this.required = x
  }
  verify(existsPrivilegeList) {
    return [true, ...this.required].reduce((x,y) => {
      return x && existsPrivilegeList.indexOf(y) >= 0
    })
  }
}

function requiredPrivileges(...x) {
  return new PrivilegeCombinator(...x)
}

module.exports = {privilege, requiredPrivileges}