const { Telegraf } = require('telegraf')
const config = require('../../config')

const bot = new Telegraf(config.bot_token)

module.exports.bot = bot
module.exports.listen = () => {
    bot.launch()
        .then(() => console.log(`Бот запущен`))
        .catch((err) => console.log(err))
}
