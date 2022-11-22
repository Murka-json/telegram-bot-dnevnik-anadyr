const { bot } = require("../../lib/platforms/telegram");

module.exports.start = async() => {
    bot.on("text", async ctx => {
        require('./commands/dnevnikLogin')(ctx)
        require('./commands/exitAccount')(ctx)
        require('./commands/start')(ctx)
        require('./commands/help')(ctx)

        require('./commands/getData/getHomeWork')(ctx, bot)
        require('./commands/getData/getUserProfile')(ctx)
        require('./commands/getData/getFinalGrades')(ctx)
        

        require('./admin/stats')(ctx)
    })


    bot.action("previous_week", async ctx => {
        require('./actions/previousWeek')(ctx)
    })
}