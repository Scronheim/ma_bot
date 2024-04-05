const { Telegraf } = require('telegraf')
const LocalSession = require('telegraf-session-local')
const { GenericMenu } = require('telegraf-menu')

const { callbackQuery } = require('./callbackQuery')

const { start } = require('./commands/start')
//const { randomBand } = require('./commands/random')
const { aboutMe } = require('./commands/aboutMe')
const { searchBand } = require('./commands/searchBand')

const { initRandomMenu, initWorldSidesMenu, clearRandomFilter, searchRandomBand, initGenreMenu } = require('./commands/random')

const token = process.env.TELEGRAM_BOT_TOKEN // https://t.me/EncyclopaediaMetallum_bot
const session = new LocalSession({ database: 'local.db.json' })

const startBot = async () => {
    const bot = new Telegraf(token)
    // bot.use(Telegraf.log((log) => console.log('>>> Telegraf "' + new Date().toString() + '" :' + log)));
    bot.catch((error, ctx) => {
        ctx.tg.sendMessage(423754317, error.toString()) // @scronheim chat id
        console.log(error)
    })
    //======= MIDDLEWARES =======
    bot.use(session.middleware())
    bot.use(GenericMenu.middleware())
    //======= /MIDDLEWARES =======

    //======= COMMANDS =======
    bot.command('start', start)

    bot.command('random', initRandomMenu)
    bot.action(new RegExp('random'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initRandomMenu))

    bot.command('worldSide', initWorldSidesMenu)
    bot.action(new RegExp('worldSide'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initWorldSidesMenu))

    bot.command('genre', initGenreMenu)
    bot.action(new RegExp('genre'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initGenreMenu))

    bot.command('clearRandomFilter', clearRandomFilter)
    bot.action(new RegExp('clearRandomFilter'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, clearRandomFilter))

    bot.command('country', initRandomMenu)
    bot.action(new RegExp('country'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initRandomMenu))

    bot.command('searchRandomBand', searchRandomBand)
    bot.action(new RegExp('searchRandomBand'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, searchRandomBand))

    bot.command('about', aboutMe)
    bot.on('text', searchBand)
    bot.on('callback_query', callbackQuery)
    //======= /COMMANDS =======

    // bot.on('text', start)

    console.log('Telegram bot started')
    await bot.launch()
}

startBot()
