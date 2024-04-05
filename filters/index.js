const { KeyboardButton } = require('telegraf-menu')

exports.randomFilters = [
  [
    new KeyboardButton('Страна', 'worldSide'),
    new KeyboardButton('Жанр', 'genre'),
  ],
  [
    new KeyboardButton('Запустить', 'searchRandomBand'),
  ],
  [
    new KeyboardButton('Очистить фильтр', 'clearRandomFilter'),
  ]
]

exports.foundedRandomBandFilters = [
  [
    new KeyboardButton('Повторить', 'searchRandomBand'),
  ],
  [
    new KeyboardButton('Изменить фильтры', 'random'),
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
    // new KeyboardButton('Heavy', 'heavy'),
    // new KeyboardButton('Power', 'power'),
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
}

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
  ]
]

exports.countriesFilters = {
  'eastAsia': [
    [
      new KeyboardButton('Китай', 'CN'),
      new KeyboardButton('Япония', 'JP'),
      new KeyboardButton('Монголия', 'MN'),
    ],
    [
      new KeyboardButton('Северная Корея', 'KP'),
      new KeyboardButton('Южная Корея', 'KR'),
      new KeyboardButton('Тайвань', 'TW'),
    ],
  ],
  'southAmerica': [
    [
      new KeyboardButton('Аргентина', 'AR'),
      new KeyboardButton('Боливия', 'BO'),
      new KeyboardButton('Бразилия', 'BR'),
    ],
    [
      new KeyboardButton('Венесуэла', 'VE'),
      new KeyboardButton('Гайана', 'GY'),
      new KeyboardButton('Колумбия', 'CO'),
    ],
    [
      new KeyboardButton('Парагвай', 'PY'),
      new KeyboardButton('Перу', 'PE'),
      new KeyboardButton('Суринам', 'SR'),
    ],
    [
      new KeyboardButton('Уругвай', 'UY'),
      new KeyboardButton('Фолклендские острова', 'FK'),
      new KeyboardButton('Гвиана (Франция)', 'GF'),
    ],
    [
      new KeyboardButton('Чили', 'CL'),
      new KeyboardButton('Эквадор', 'EC'),
      new KeyboardButton('Южная Георгия и Южные Сандвичевы Острова (Великобритания)', 'GS'),
    ],
  ],
  'northAmerica': [
    [
      new KeyboardButton('Канада', 'CA'),
      new KeyboardButton('США', 'US'),
      new KeyboardButton('Мексика', 'MX'),
    ],
  ],
  'australia': [
    [
      new KeyboardButton('Австралия', 'AU'),
    ],
  ],
  'cis': [
    [
      new KeyboardButton('Россия', 'RU'),
      new KeyboardButton('Украина', 'UA'),
      new KeyboardButton('Беларусь', 'BY'),
    ],
    [
      new KeyboardButton('Азербайджан', 'AZ'),
      new KeyboardButton('Казахстан', 'KZ'),
      new KeyboardButton('Молдавия', 'MD'),
    ],
    [
      new KeyboardButton('Кыргызстан', 'KG'),
      new KeyboardButton('Таджикистан', 'TJ'),
      new KeyboardButton('Узбекистан', 'UZ'),
    ],
  ],
  'scandinavia': [
    [
      new KeyboardButton('Норвегия', 'NO'),
      new KeyboardButton('Швеция', 'SE'),
      new KeyboardButton('Финляндия', 'FI'),
    ],
  ],
  'britishIslands': [
    [
      new KeyboardButton('Соединенное королевство', 'GB'),
      new KeyboardButton('Ирландия', 'IE'),
    ],
  ],
  'balkans': [
    [
      new KeyboardButton('Албания', 'AL'),
      new KeyboardButton('Болгария', 'BG'),
      new KeyboardButton('Босния и Герцеговина', 'BA'),
    ],
    [
      new KeyboardButton('Греция', 'GR'),
      new KeyboardButton('Румыния', 'RO'),
      new KeyboardButton('Северная Македония', 'MK'),
    ],
    [
      new KeyboardButton('Сербия', 'RS'),
      new KeyboardButton('Словения', 'SI'),
      new KeyboardButton('Турция', 'TR'),
    ],
    [
      new KeyboardButton('Хорватия', 'HR'),
      new KeyboardButton('Черногория', 'ME'),
    ],
  ],
  'africa': [
    [
      new KeyboardButton('Алжир', 'DZ'),
      new KeyboardButton('Ангола', 'AO'),
      new KeyboardButton('Бенин', 'BJ'),
    ],
    [
      new KeyboardButton('Ботсвана', 'BW'),
      new KeyboardButton('Буркина Фасо', 'BF'),
      new KeyboardButton('Бурунди', 'BI'),
    ],
    [
      new KeyboardButton('Камерун', 'CM'),
      new KeyboardButton('Центральноафриканская Республика', 'CF'),
      new KeyboardButton('Чад', 'TD'),
    ],
    [
      new KeyboardButton('Комора', 'KM'),
      new KeyboardButton('Джибути', 'DJ'),
      new KeyboardButton('Египет', 'EG'),
    ],
    [
      new KeyboardButton('Демократическая республика Конго', 'CD'),
      new KeyboardButton('Республика Конго', 'CG'),
      new KeyboardButton('Экваториальная Гвинея', 'GQ'),
    ],
  ]
}