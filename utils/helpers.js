const { worldSides, countries, genres } = require('../utils/const')

exports.formatSelectedFilters = (ctx) => {
  return `
Выберите фильтры
Регион: ${worldSides[ctx.session.worldSide]}
Страна: ${countries[ctx.session.country]}
Жанр: ${genres[ctx.session.subGenre]}
`
}