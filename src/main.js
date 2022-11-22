const postgresql = require('../lib/database/postgresql')
const telegram = require('../lib/platforms/telegram')
const bot = require('./bot/main.js')

module.exports.start = () => {
    postgresql.connect()
    telegram.listen()
    bot.start()
}