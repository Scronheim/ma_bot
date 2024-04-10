exports.initSession = async (ctx, next) => {
  if (!ctx.session.worldSide
    && !ctx.session.country
    && !ctx.session.genre
    && !ctx.session.subGenre
    && !ctx.session.bandStatus
  ) {
    ctx.session.worldSide = ''
    ctx.session.country = ''
    ctx.session.genre = ''
    ctx.session.subGenre = ''
    ctx.session.bandStatus = ''
  }

  return next()
}
