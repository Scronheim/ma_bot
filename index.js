const { Telegraf } = require('telegraf')

const { callbackQuery } = require('./callbackQuery')

const { start } = require('./commands/start')
const { randomBand } = require('./commands/random')
const { aboutMe } = require('./commands/aboutMe')
const { searchBand } = require('./commands/searchBand')

const token = process.env.TELEGRAM_BOT_TOKEN // https://t.me/EncyclopaediaMetallum_bot


const startBot = async () => {
    const bot = new Telegraf(token)

    bot.catch((error, ctx) => {
        ctx.tg.sendMessage(423754317, error.toString()) // @scronheim chat id
        console.log(error)
    })
    //======= MIDDLEWARES =======

    //======= /MIDDLEWARES =======

    bot.on('callback_query', callbackQuery)
    //======= COMMANDS =======
    bot.command('start', start)
    bot.command('random', randomBand)
    bot.command('about', aboutMe)
    bot.on('text', searchBand)
    //======= /COMMANDS =======

    // bot.on('text', start)

    console.log('Telegram bot started')
    await bot.launch()
}

startBot()
