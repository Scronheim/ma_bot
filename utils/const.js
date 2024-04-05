const https = require('https')

exports.countryFlagsMapper = {
  Russia: '🇷🇺',
  Ukraine: '🇺🇦',
  Belarus: '🇧🇾',
  Kazakhstan: '🇰🇿',
  Slovakia: '🇸🇰',
  Germany: '🇩🇪',
  Poland: '🇵🇱',
  Sweden: '🇸🇪',
  Finland: '🇫🇮',
  UK: '🇬🇧󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'UK & Europe': '🇬🇧 🇪🇺󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
  'USA & Europe': '🇺🇸 🇪🇺󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
  'UK, Europe & US': '🇬🇧 🇪🇺 🇺🇸󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
  'USA & Canada': '🇺🇸 🇨🇦󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
  Europe: '🇪🇺',
  Norway: '🇳🇴',
  Venezuela: '🇻🇪',
  Netherlands: '🇳🇱',
  Italy: '🇮🇪',
  Israel: '🇮🇱',
  'Czech Republic': '🇨🇿',
  Czechoslovakia: '🇨🇿',
  Iceland: '🇮🇸',
  Japan: '🇯🇵',
  US: '🇺🇸',
  Canada: '🇨🇦',
  'New Zealand': '🇳🇿',
  Australia: '🇦🇺',
  Austria: '🇦🇹',
  Spain: '🇪🇸',
  Belgium: '🇧🇪',
  Switzerland: '🇨🇭',
  France: '🇫🇷',
  Greece: '🇬🇷',
  Unknown: '❓',
  Worldwide: '🌍',
  International: '🌍',
  Mexico: '🇲🇽',
  Honduras: '🇭🇳',
  Brazil: '🇧🇷',
  China: '🇨🇳',
  Bolivia: '🇧🇴',
}

exports.bandStatusMapper = {
  'Changed name': 'Сменили название',
  Active: 'Активны',
  'Split-up': 'Распались',
  Unknown: 'Неизвестно',
  'On hold': 'В заморозке',
}

exports.axiosOptions = {
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  timeout: 3000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36'
  }
}