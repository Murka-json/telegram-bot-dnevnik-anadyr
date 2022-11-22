const { Client } = require('pg')
const config = require('../../config')


const db = new Client(config.postgresql)


module.exports.connect = async () => {
    await db.connect()
        .then(() => console.log(`База данных подключена`))
        .catch((err) => console.log(err))
}


module.exports.request = async (sql, params) => {
    return new Promise(async (resolve, reject) => {
        await db.query(sql, params)
            .then(r => resolve(r.rows))
            .catch(err => reject(err))
    })
}