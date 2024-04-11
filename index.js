const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const LocalSession = require('telegraf-session-local')
const { GenericMenu } = require('telegraf-menu')

const { callbackQuery } = require('./callbackQuery')
const { initSession } = require('./middlewares/initSession')

const { start } = require('./commands/start')
const { aboutMe } = require('./commands/aboutMe')
const { searchBand } = require('./commands/searchBand')

const {
    initRandomMenu, initWorldSidesMenu, initCountryMenu,
    clearRandomFilter, initSubGenreMenu, initGenreMenu,
    initStatusMenu,
} = require('./commands/random')

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
    bot.use(initSession)
    //======= /MIDDLEWARES =======

    //======= COMMANDS =======
    bot.command('start', start)

    bot.command('random', initRandomMenu)
    bot.action(new RegExp('random'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initRandomMenu))

    bot.command('worldSide', initWorldSidesMenu)
    bot.action(new RegExp('worldSide'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initWorldSidesMenu))

    bot.command('genre', initGenreMenu)
    bot.action(new RegExp('genre'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initGenreMenu))

    bot.command('subGenre', initSubGenreMenu)
    bot.action(new RegExp('subGenre'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initSubGenreMenu))

    bot.command('status', initStatusMenu)
    bot.action(new RegExp('status'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initStatusMenu))

    bot.command('clearRandomFilter', clearRandomFilter)
    bot.action(new RegExp('clearRandomFilter'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, clearRandomFilter))

    bot.command('country', initCountryMenu)
    bot.action(new RegExp('country'), GenericMenu.onAction(ctx => ctx.session.keyboardMenu, initCountryMenu))

    bot.command('about', aboutMe)

    bot.on(message('text'), searchBand)
    bot.on('callback_query', callbackQuery)
    //======= /COMMANDS =======

    console.log('Telegram bot started')
    await bot.launch()
}

startBot()
