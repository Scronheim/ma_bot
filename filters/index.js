const { KeyboardButton } = require('telegraf-menu')

const { bandStatusMapper } = require('../utils/const')

exports.randomFilters = [
  [
    new KeyboardButton('Страна', 'worldSide'),
    new KeyboardButton('Жанр', 'genre'),
    new KeyboardButton('Статус', 'status'),
  ],
  [
    new KeyboardButton('Случайная группа', 'searchRandomBand'),
  ],
  [
    new KeyboardButton('Очистить фильтр', 'clearRandomFilter'),
  ]
]

exports.genreFilters = [
  [
    new KeyboardButton('Black', 'black'),
    new KeyboardButton('Death', 'death'),
    new KeyboardButton('Doom', 'doom'),
  ],
  [
    new KeyboardButton('Gothic', 'gothic'),
    new KeyboardButton('Heavy', 'heavy'),
    new KeyboardButton('Power', 'power'),
  ],
  [
    new KeyboardButton('Убрать фильтр', 'clearGenreFilter'),
  ],
]

exports.subGenreFilters = {
  black: [
    [
      new KeyboardButton('Black metal', 'blackMetal'),
      new KeyboardButton('Atmospheric black', 'atmosphericBlack'),
      new KeyboardButton('Depressive black', 'depressiveBlack'),
    ],
    [
      new KeyboardButton('Symphonic black', 'symphonicBlack'),
      new KeyboardButton('Melodic black', 'melodicBlack'),
      new KeyboardButton('True black', 'trueBlack'),
    ],
    [
      new KeyboardButton('Post-black', 'postBlack'),
      new KeyboardButton('Raw black', 'rawBlack'),
    ],
  ],
  death: [
    [
      new KeyboardButton('Death metal', 'deathMetal'),
      new KeyboardButton('Atmospheric death', 'atmosphericDeath'),
      new KeyboardButton('Melodic Death', 'melodicDeath'),
    ],
    [
      new KeyboardButton('Symphonic death', 'symphonicDeath'),
      new KeyboardButton('Progressive death', 'progressiveDeath'),
      new KeyboardButton('Technical death', 'technicalDeath'),
    ],
    [
      new KeyboardButton('Slam', 'slammingDeath'),
      new KeyboardButton('Brutal death', 'brutalDeath'),
    ],
  ],
  doom: [
    [
      new KeyboardButton('Doom metal', 'doomMetal'),
      new KeyboardButton('Atmospheric doom', 'atmosphericDoom'),
      new KeyboardButton('Doom death', 'doomDeath'),
    ],
    [
      new KeyboardButton('Melodic doom', 'melodicDoom'),
      new KeyboardButton('Funeral doom', 'funeralDoom'),
    ],
  ],
  gothic: [
    [
      new KeyboardButton('Gothic metal', 'gothicMetal'),
      new KeyboardButton('Gothic rock', 'gothicRock'),
    ],
  ],
  heavy: [
    [
      new KeyboardButton('Heavy metal', 'heavyMetal'),
    ],
  ],
  power: [
    [
      new KeyboardButton('Power metal', 'powerMetal'),
    ],
  ],
}

exports.bandStatusFilters = [
  [
    new KeyboardButton(bandStatusMapper['Active'], 1),
    new KeyboardButton(bandStatusMapper['On hold'], 2),
    new KeyboardButton(bandStatusMapper['Split-up'], 3),
  ],
  [
    new KeyboardButton(bandStatusMapper['Unknown'], 4),
    new KeyboardButton(bandStatusMapper['Changed name'], 5),
    new KeyboardButton(bandStatusMapper['Disputed'], 6),
  ],
  [
    new KeyboardButton('Убрать фильтр', 'clearStatusFilter'),
  ],
]

exports.worldSidesFilters = [
  [
    new KeyboardButton('Скандинавия', 'scandinavia'),
    new KeyboardButton('Британские острова', 'britishIslands'),
    new KeyboardButton('Балканы', 'balkans'),
  ],
  [
    new KeyboardButton('Северная Америка', 'northAmerica'),
    new KeyboardButton('Южная Америка', 'southAmerica'),
    new KeyboardButton('Восточная Азия', 'eastAsia'),
  ],
  [
    new KeyboardButton('Африка', 'africa'),
    new KeyboardButton('СНГ', 'cis'),
    new KeyboardButton('Австралия', 'australia'),
  ],
  [
    new KeyboardButton('Убрать фильтр', 'clearCountryFilter'),
  ],
]

exports.countriesFilters = {
  'eastAsia': [
    [
      new KeyboardButton('Китай', 'China'),
      new KeyboardButton('Япония', 'Japan'),
      new KeyboardButton('Монголия', 'Mongolia'),
    ],
    [
      new KeyboardButton('Северная Корея', 'North Korea'),
      new KeyboardButton('Южная Корея', 'South Korea'),
      new KeyboardButton('Тайвань', 'Taiwan'),
    ],
  ],
  'southAmerica': [
    [
      new KeyboardButton('Аргентина', 'Argentina'),
      new KeyboardButton('Боливия', 'Bolivia'),
      new KeyboardButton('Бразилия', 'Brazil'),
    ],
    [
      new KeyboardButton('Венесуэла', 'Venezuela'),
      new KeyboardButton('Гайана', 'Guyana'),
      new KeyboardButton('Колумбия', 'Colombia'),
    ],
    [
      new KeyboardButton('Парагвай', 'Paraguay'),
      new KeyboardButton('Перу', 'Peru'),
      new KeyboardButton('Суринам', 'Suriname'),
    ],
    [
      new KeyboardButton('Уругвай', 'Uruguay'),
      new KeyboardButton('Фолклендские острова', 'Folkland Isnlands'),
      new KeyboardButton('Гвиана (Франция)', 'French Guiana'),
    ],
    [
      new KeyboardButton('Чили', 'Chile'),
      new KeyboardButton('Эквадор', 'Ecuador'),
      new KeyboardButton('Южная Георгия и Южные Сандвичевы Острова (Великобритания)', 'South Georgia & South Sandwich Islands'),
    ],
  ],
  'northAmerica': [
    [
      new KeyboardButton('Канада', 'Canada'),
      new KeyboardButton('США', 'United States'),
      new KeyboardButton('Мексика', 'Mexico'),
    ],
  ],
  'australia': [
    [
      new KeyboardButton('Австралия', 'Australia'),
    ],
  ],
  'cis': [
    [
      new KeyboardButton('Россия', 'Russia'),
      new KeyboardButton('Украина', 'Ukraine'),
      new KeyboardButton('Беларусь', 'Belarus'),
    ],
    [
      new KeyboardButton('Азербайджан', 'Azerbaijan'),
      new KeyboardButton('Казахстан', 'Kazakhstan'),
      new KeyboardButton('Молдавия', 'Moldavia'),
    ],
    [
      new KeyboardButton('Кыргызстан', 'Kyrgyzstan'),
      new KeyboardButton('Таджикистан', 'Tajikistan'),
      new KeyboardButton('Узбекистан', 'Uzbekistan'),
    ],
  ],
  'scandinavia': [
    [
      new KeyboardButton('Норвегия', 'Norway'),
      new KeyboardButton('Швеция', 'Sweden'),
      new KeyboardButton('Финляндия', 'Finland'),
    ],
  ],
  'britishIslands': [
    [
      new KeyboardButton('Соединенное королевство', 'United Kingdom'),
      new KeyboardButton('Ирландия', 'Ireland'),
    ],
  ],
  'balkans': [
    [
      new KeyboardButton('Албания', 'Albania'),
      new KeyboardButton('Болгария', 'Bulgaria'),
      new KeyboardButton('Босния и Герцеговина', 'Bosnia and Herzegovina'),
    ],
    [
      new KeyboardButton('Греция', 'Greece'),
      new KeyboardButton('Румыния', 'Romania'),
      new KeyboardButton('Северная Македония', 'North Macedonia'),
    ],
    [
      new KeyboardButton('Сербия', 'Serbia'),
      new KeyboardButton('Словения', 'Slovenia'),
      new KeyboardButton('Турция', 'Türkiye'),
    ],
    [
      new KeyboardButton('Хорватия', 'Croatia'),
      new KeyboardButton('Черногория', 'Montenegro'),
    ],
  ],
  'africa': [
    [
      new KeyboardButton('Алжир', 'Algeria'),
      new KeyboardButton('Ангола', 'Angola'),
      new KeyboardButton('Бенин', 'Benin'),
    ],
    [
      new KeyboardButton('Ботсвана', 'Botswana'),
      new KeyboardButton('Буркина Фасо', 'Burkina Faso'),
      new KeyboardButton('Бурунди', 'Burundi'),
    ],
    [
      new KeyboardButton('Камерун', 'Cameroon'),
      new KeyboardButton('Центральноафриканская Республика', 'Central African Republic'),
      new KeyboardButton('Чад', 'Chad'),
    ],
    [
      new KeyboardButton('Комора', 'Comoros'),
      new KeyboardButton('Джибути', 'Djibouti'),
      new KeyboardButton('Египет', 'Egypt'),
    ],
    [
      new KeyboardButton('Демократическая республика Конго', 'Congo, Democratic Republic of'),
      new KeyboardButton('Республика Конго', 'Congo, Republic of'),
      new KeyboardButton('Экваториальная Гвинея', 'Equatorial Guinea'),
    ],
  ]
}