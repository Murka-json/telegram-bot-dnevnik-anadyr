const puppeteer = require('../../../../lib/puppeteer/getFinalGrades')
const postgresql = require('../../../../lib/database/postgresql')

const { unlink } = require('fs')
const path = require('path')

module.exports = async (ctx, bot) => {
    if (/Итоговые оценки/i.test(ctx.update.message.text) || /Дз/i.test(ctx.update.message.text)) {

        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [ctx.update.message.from.id])

        if (!user) {
            return ctx.reply(`Вы не авторизованы. Пожалуйста, авторизуйтесь снова, возможно проводилось обновление или произошел сбой`)
        }

        ctx.reply(`Получаем итоговые оценки. Это займёт около минуты...`)

        await puppeteer(user.username, user.password).then(async () => {
            await ctx.replyWithPhoto({
                source: path.resolve() + `/images/${user.username}.png`,
            })

            unlink(path.resolve() + `/images/${user.username}.png`, () => console.log(`Файл удалён`))
        }).catch((err) => {
            ctx.reply(err)
        })
    }
}