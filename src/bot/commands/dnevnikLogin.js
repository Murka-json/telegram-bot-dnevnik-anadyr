const postgresql = require('../../../lib/database/postgresql')
const { Keyboard } = require('telegram-keyboard')

module.exports = async (ctx) => {
    const userId = ctx.message.chat.id
    console.log(ctx.update.message.text.split(" "))

    if (ctx.update.message.text.split(" ")[0] == '/login') {


        if (!ctx.update.message.text.split(" ")[1]) {
            return ctx.reply(`Не указан логин пользователя`)
        }

        if (!ctx.update.message.text.split(" ")[2]) {
            return ctx.reply(`Не указан пароль пользователя`)
        }

        const [user] = await postgresql.request(`SELECT * FROM users WHERE tg_id = $1`, [userId])

        if (user) {
            return ctx.reply(`Вы уже авторизованы.\nПросто напишите: "Дз" или "Домашнее задание"`)
        }

        postgresql.request(`
                INSERT 
                    INTO 
                        users(tg_id, username, password) 
                VALUES 
                    (
                        ${userId}, 
                        '${ctx.update.message.text.split(" ")[1]}', 
                        '${ctx.update.message.text.split(" ")[2]}'
                    )
            `)

        const keyboard = Keyboard.make(['Домашнее задание', 'Итоговые оценки','Профиль', 'Выйти ', 'Помощь'], { pattern: [2, 2] }).reply()
        
        await ctx.reply(
            `Вы успешно авторизованы ✅\n\n` +
            `Чтобы посмотреть оценки или домашнее задание нажмите кнопку ниже:`, 
            keyboard
        )
    }
}