const puppeteer = require('../../../lib/puppeteer/getPreviuesWeek')
const postgresql = require('../../../lib/database/postgresql')
const path = require('path')

module.exports = async ctx => {
    if(ctx.update.callback_query.data == 'previous_week') {
        
        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [ ctx.update.callback_query.from.id ])

        if(!user) {
            return ctx.reply(
                `Вы не авторизованы. Пожалуйста, авторизуйтесь снова, возможно проводилось обновление или произошел сбой 🙁\n\n` +
                `Пример авторизации:\n` +
                `/login u7777 77777`
            )
        }

        ctx.reply(`Получаем данные прошлой недели. Процесс займет не более 2-ух минут..`)

        puppeteer(user.username, user.password).then(async() => {
            await ctx.replyWithPhoto({
                source: path.resolve() + `/images/${user.username}.png`,
            })
        }).catch((err) => {
            ctx.reply(err)
        })
    }
}