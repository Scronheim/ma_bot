const { RegularMenu, RadioMenu } = require('telegraf-menu')

const { randomFilters, worldSidesFilters, countriesFilters } = require('../filters')
const { formatSelectedFilters } = require('../utils/helpers')
const { getRandomBand } = require('./searchBand')
const { parseBandInfo, parseDiscography, buildKeyboardDiscography, replyBandWithPhoto } = require('../callbackQuery')

exports.randomBand = async (ctx) => {
  //const { data } = await getRandomBand()
  //const { id, name, genre, country, location, themes, status, label, formYear, photoUrl } = parseBandInfo(data)
  //const discography = await parseDiscography(id)
  //const inlineKeyboard = buildKeyboardDiscography(discography)

  //const band = {
  //  name, genre, country, location, themes, status, label, formYear, photoUrl
  //}

  //replyBandWithPhoto(ctx, band, inlineKeyboard)
}

function initRandomMenu(ctx) {
  new RegularMenu(
    {
      action: 'random',
      message: formatSelectedFilters(ctx),
      filters: randomFilters,
      replaceable: true,
      menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
      menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
      onChange(changeCtx, state) {
        switch (state) {
          case 'worldSide':
            return initWorldSidesMenu(changeCtx)

          //case 'genre':
          //  return initBasketObjectMenu(changeCtx)
          case 'clearRandomFilter':
            return clearRandomFilter(changeCtx)
        }
      },
    },
  ).sendMenu(ctx)
}

function initWorldSidesMenu(ctx) {
  new RadioMenu(
    {
      action: 'worldSide',
      message: 'Выберите регион для уточнения страны',
      filters: worldSidesFilters,
      replaceable: true,
      menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
      menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
      beforeChange(changeCtx, worldSide) {
        changeCtx.session.worldSide = worldSide
      },
      onChange(submitCtx) {
        initCountryMenu(submitCtx)
      },
    },
  ).sendMenu(ctx)
}

function initCountryMenu(ctx) {
  new RadioMenu(
    {
      action: 'country',
      message: 'Выберите страну',
      filters: countriesFilters[ctx.session.worldSide],
      replaceable: true,
      menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
      menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
      beforeChange(changeCtx, country) {
        changeCtx.session.country = country
      },
      onChange(submitCtx) {
        initRandomMenu(submitCtx)
      },
    },
  ).sendMenu(ctx)
}

function clearRandomFilter(ctx) {
  ctx.session.worldSide = 'Не выбрано'
  ctx.session.country = 'Не выбрано'
  ctx.session.genre = 'Не выбрано'
  ctx.answerCbQuery()
}

exports.initRandomMenu = initRandomMenu
exports.initWorldSidesMenu = initWorldSidesMenu
exports.clearRandomFilter = clearRandomFilter