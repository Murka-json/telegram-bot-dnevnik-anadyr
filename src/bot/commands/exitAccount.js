const postgresql = require('../../../lib/database/postgresql')
const { Keyboard } = require('telegram-keyboard')

module.exports = async(ctx) => {
    if(/Выйти/i.test(ctx.update.message.text)) {
        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [ctx.update.message.from.id])

        if(!user) {
            return ctx.reply(`Вы еще не зашли в свой аккаунт`)
        }
        
        
        postgresql.request(`DELETE FROM users WHERE tg_id = $1`, [ctx.update.message.from.id])


        const keyboard = Keyboard.make(["Войди блина малина"]).reply()
        ctx.reply(`Вы успешно вышли из своего аккаунта...`, keyboard)
    }
}