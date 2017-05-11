let nodeMailer = require('nodemailer')
let moment = require('moment')
let smtpConf = {
  host: 'smtp.126.com',
  port: 25,
  secure: false,
  auth: {
    user: 'ran9er@126.com',
    pass: 'tpkj123'
  }
}
let transporter = nodeMailer.createTransport(smtpConf)


let toOperator = (payload) => {
  let c = payload.content
  let t = moment(payload['created_at']).format('YY年M月D日 H时m分s秒')
  let mail = {
    subject: `用户“${c.name}”留言`,
    from: smtpConf.auth.user,
    to: process.env.CMS_MAIL_RECEV || 'murphy@iffy.me',
    text: `
    姓名： ${c.name}
    电话： ${c.phone}
    邮箱： ${c.mail}
    时间： ${t}
    内容： ${c.content}
    `
  }
  try {
    transporter.sendMail(mail)
  } catch (e) {
    console.log(e)
  }

}

module.exports = {
  toOperator
}
