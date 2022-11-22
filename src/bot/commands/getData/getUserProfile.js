const postgresql = require('../../../../lib/database/postgresql')
const { Keyboard } = require('telegram-keyboard')

module.exports = async (ctx) => {
    const userId = ctx.message.chat.id
    if (/Профиль/i.test(ctx.update.message.text)) {
        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [userId])

        if(!user) {
            return ctx.reply(`Вы не авторизованы. Пожалуйста, авторизуйтесь снова, возможно проводилось обновление или произошел сбой`)
        }

        return ctx.reply(
            `Данный бота:\n` +
            `ID: ${user.id}\n` +
            `TG-ID: ${user.tg_id}\n\n` +
            `Данные эл. дневника:\n` +
            `Логин: ${user.username}\n` +
            `Пароль: ${user.password}`
        )
    }
}