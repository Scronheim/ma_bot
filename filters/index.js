const { KeyboardButton } = require('telegraf-menu')

exports.randomFilters = [
  [
    new KeyboardButton('Часть света', 'worldSide'),
    new KeyboardButton('Жанр', 'genre'),
  ],
  [
    new KeyboardButton('Очистить фильтр', 'clearRandomFilter'),
  ]
]

exports.worldSidesFilters = [
  [
    new KeyboardButton('Скандинавия', 'Скандинавия'),
    new KeyboardButton('Британские острова', 'Британские острова'),
    new KeyboardButton('Балканы', 'Балканы'),
  ],
  [
    new KeyboardButton('Африка', 'Африка'),
    new KeyboardButton('Северная Америка', 'Северная Америка'),
    new KeyboardButton('Южная Америка', 'Южная Америка'),
  ],
  [
    new KeyboardButton('Восточная Азия', 'Восточная Азия'),
  ]
]

exports.countriesFilters = {
  'Скандинавия': [
    [
      new KeyboardButton('Норвегия', 'Норвегия'),
      new KeyboardButton('Швеция', 'Швеция'),
      new KeyboardButton('Финляндия', 'Финляндия'),
    ],
  ],
  'Британские острова': [
    [
      new KeyboardButton('Соединенное королевство', 'Соединенное королевство'),
      new KeyboardButton('Ирландия', 'Ирландия'),
    ],
  ],
  'Балканы': [
    [
      new KeyboardButton('Албания', 'Албания'),
      new KeyboardButton('Болгария', 'Болгария'),
      new KeyboardButton('Босния и Герцеговина', 'Босния и Герцеговина'),
    ],
    [
      new KeyboardButton('Греция', 'Греция'),
      new KeyboardButton('Румыния', 'Румыния'),
      new KeyboardButton('Северная Македония', 'Северная Македония'),
    ],
    [
      new KeyboardButton('Сербия', 'Сербия'),
      new KeyboardButton('Словения', 'Словения'),
      new KeyboardButton('Турция', 'Турция'),
    ],
    [
      new KeyboardButton('Хорватия', 'Хорватия'),
      new KeyboardButton('Черногория', 'Черногория'),
    ],
  ],
  'Африка': [
    [
      new KeyboardButton('Алжир', 'Алжир'),
      new KeyboardButton('Ангола', 'Ангола'),
      new KeyboardButton('Бенин', 'Бенин'),
    ],
    [
      new KeyboardButton('Ботсвана', 'Ботсвана'),
      new KeyboardButton('Буркина Фасо', 'Буркина Фасо'),
      new KeyboardButton('Бурунди', 'Бурунди'),
    ],
    [
      new KeyboardButton('Камерун', 'Камерун'),
      new KeyboardButton('Центральноафриканская Республика', 'Центральноафриканская Республика'),
      new KeyboardButton('Чад', 'Чад'),
    ],
    [
      new KeyboardButton('Комора', 'Комора'),
      new KeyboardButton('Джибути', 'Джибути'),
      new KeyboardButton('Египет', 'Египет'),
    ],
    [
      new KeyboardButton('Демократическая республика Конго', 'Демократическая республика Конго'),
      new KeyboardButton('Республика Конго', 'Республика Конго'),
      new KeyboardButton('Экваториальная Гвинея', 'Экваториальная Гвинея'),
    ],
  ]
}