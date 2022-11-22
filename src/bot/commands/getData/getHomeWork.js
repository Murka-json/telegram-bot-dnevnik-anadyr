const puppeteer = require('../../../../lib/puppeteer/getLastWeek')
const postgresql = require('../../../../lib/database/postgresql')
const { Keyboard, Key } = require('telegram-keyboard')
const { unlink } = require('fs')
const path = require('path')


module.exports = async (ctx, bot) => {
    if (/Домашнее задание/i.test(ctx.update.message.text) || /Дз/i.test(ctx.update.message.text)) {

        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [ctx.update.message.from.id])

        if (!user) {
            return ctx.reply(`Вы не авторизованы. Пожалуйста, авторизуйтесь снова, возможно проводилось обновление или произошел сбой`)
        }

        ctx.reply(`Получаем данные. Это займёт около минуты...`)

        await puppeteer(user.username, user.password).then(async () => {
            await ctx.replyWithPhoto({
                source: path.resolve() + `/images/${user.username}.png`,
            })

            unlink(path.resolve() + `/images/${user.username}.png`, () => console.log(`Файл удалён`))

            const intoKeyboard = Keyboard.make([
                Key.callback('Посмотреть прошлую неделю', 'previous_week')
            ]).inline()

            await ctx.reply(`Возможно, Вы желаете посмотреть предыдущую неделю?`, intoKeyboard)

        }).catch((err) => {
            ctx.reply(err)
        })
    }
}