const { worldSides, countries, genres, countryFlagsMapper, bandStatusMapper, bandStatus } = require('../utils/const')

exports.formatSelectedFilters = (ctx) => {
  return `
Выберите фильтры
Регион: ${worldSides[ctx.session.worldSide]}
Страна: ${countries[ctx.session.country]}
Жанр: ${genres[ctx.session.subGenre]}
Статус: ${bandStatus[ctx.session.bandStatus]}
`
}

exports.getFormattedBandText = (band) => {
  return `
<b>Группа</b>: ${band.title}
<b>Жанр</b>: ${band.genre}
<b>Страна</b>: ${countryFlagsMapper[band.country]} ${band.country} (${band.city})
<b>Темы текстов</b>: ${band.lyricsTheme}
<b>Год образования</b>: ${band.formedIn}
<b>Годы активности</b>: ${band.yearsActive}
<b>Статус</b>: ${bandStatusMapper[band.status]}
<b>Лейбл</b>: ${band.label}
`
}

exports.prepareNames = (name) => {
  return name.replaceAll(' ', '_').replaceAll('/', '')
}
