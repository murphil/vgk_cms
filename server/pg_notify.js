let pg = require('pg')
let {toOperator} = require('./sendMail')
let {host, port, user, database, password} = require('./database/db_account_info.yml.json')
let constr = `postgres://${user}:${password}@${host}:${port}/${database}`

let CHANNEL = {
  MOG: 'message_of_guest'
}

let pgClient = new pg.Client(constr)
pgClient.query(`LISTEN ${CHANNEL.MOG}`)
pgClient.on('notification', data => {
  switch (data.channel){
    case CHANNEL.MOG:
      toOperator(JSON.parse(data.payload))
      break
  }
})
pgClient.connect()
