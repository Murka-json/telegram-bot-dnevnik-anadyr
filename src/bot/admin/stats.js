const postgresql = require('../../../lib/postgresql.js')

module.exports = async (ctx) => {
    if(/Статистика/i.test(ctx.update.message.text) && ctx.from.id == 1595889574) { 
        const users = await postgresql.request(`SELECT * FROM users`)

        return ctx.reply(`Всего пользователей: ${users.length}`)
    }
}