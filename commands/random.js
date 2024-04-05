const { RegularMenu, RadioMenu } = require('telegraf-menu')
const axios = require('axios')

const { randomFilters, worldSidesFilters, countriesFilters, genreFilters, subGenreFilters } = require('../filters')
const { genres } = require('../utils/const')
const { formatSelectedFilters } = require('../utils/helpers')
const { answerWithBand } = require('../callbackQuery')

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
          case 'genre':
            return initGenreMenu(changeCtx)
          case 'clearRandomFilter':
            return clearRandomFilter(changeCtx)
          case 'searchRandomBand':
            return searchRandomBand(changeCtx)
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

function initGenreMenu(ctx) {
  new RadioMenu(
    {
      action: 'genre',
      message: 'Выберите жанр',
      filters: genreFilters,
      replaceable: true,
      menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
      menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
      beforeChange(changeCtx, genre) {
        changeCtx.session.genre = genre
      },
      onChange(submitCtx) {
        initSubGenreMenu(submitCtx)
      },
    },
  ).sendMenu(ctx)
}

function initSubGenreMenu(ctx) {
  new RadioMenu(
    {
      action: 'genre',
      message: 'Выберите суб жанр',
      filters: subGenreFilters[ctx.session.genre],
      replaceable: true,
      menuGetter: (menuCtx) => menuCtx.session.keyboardMenu,
      menuSetter: (menuCtx, menu) => menuCtx.session.keyboardMenu = menu,
      beforeChange(changeCtx, subGenre) {
        changeCtx.session.subGenre = subGenre
      },
      onChange(submitCtx) {
        initRandomMenu(submitCtx)
      },
    },
  ).sendMenu(ctx)
}

async function searchRandomBand(ctx) {
  const genre = ctx.session.subGenre === '' ? '' : genres[ctx.session.subGenre]
  const countryCode = ctx.session.country
  const iTotalRecords = await firstRequest(genre, countryCode)
  const totalRecords = Math.floor(Math.random() * (1 + iTotalRecords - 1)) + 1
  const randomBand = await recieveRandomBand(genre, countryCode, totalRecords)
  if (randomBand) {
    const bandId = randomBand[0].split('/')[5].split('">')[0]
    await answerWithBand(ctx, bandId)
    ctx.session.isRandom = true
  } else {
    ctx.reply('Ничего не найдено')
  }
  await ctx.answerCbQuery()
}

async function recieveRandomBand(genre, countryCode, totalRecords) {
  const { data } = await axios.get(`https://www.metal-archives.com/search/ajax-advanced/searching/bands/?bandName=&genre=${genre}&country=${countryCode}&yearCreationFrom=&yearCreationTo=&bandNotes=&status=&themes=&location=&bandLabelName=&sEcho=1&iColumns=3&sColumns=&iDisplayStart=${totalRecords}&iDisplayLength=1`)
  return data.aaData[0]
}

async function firstRequest(genre, countryCode) {
  const { data } = await axios.get(`https://www.metal-archives.com/search/ajax-advanced/searching/bands/?bandName=&genre=${genre}&country=${countryCode}&yearCreationFrom=&yearCreationTo=&bandNotes=&status=&themes=&location=&bandLabelName=&sEcho=1&iColumns=3&sColumns=&iDisplayStart=&iDisplayLength=1`)
  return data.iTotalRecords
}

function clearRandomFilter(ctx) {
  ctx.session.worldSide = ''
  ctx.session.country = ''
  ctx.session.genre = ''
  ctx.session.subGenre = ''
  initRandomMenu(ctx)
}

exports.initRandomMenu = initRandomMenu
exports.initWorldSidesMenu = initWorldSidesMenu
exports.initGenreMenu = initGenreMenu
exports.clearRandomFilter = clearRandomFilter
exports.searchRandomBand = searchRandomBand