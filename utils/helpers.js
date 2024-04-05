exports.formatSelectedFilters = (ctx) => {
  return `
Выберите фильтры
Часть света: ${ctx.session.worldSide}
Страна: ${ctx.session.country}
`
}