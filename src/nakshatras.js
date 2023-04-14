export function nakshatraByNum(number) {
  const nakshatras = [
    { name: 'Ашвини', ruler: 'Ke', description: '' },
    { name: 'Бхарани', ruler: 'Ve', description: '' },
    { name: 'Криттика', ruler: 'Su', description: '' },
    { name: 'Рохини', ruler: 'Mo', description: '' },
    { name: 'Мригашира', ruler: 'Ma', description: '' },
    { name: 'Ардра', ruler: 'Ra', description: '' },
    { name: 'Пунарвасу', ruler: 'Ju', description: '' },
    { name: 'Пушья', ruler: 'Sa', description: '' },
    { name: 'Ашлеша', ruler: 'Me', description: '' },
    { name: 'Магха', ruler: 'Ke', description: '' },
    { name: 'Пурвапхалгуни', ruler: 'Ve', description: '' },
    { name: 'Уттарапхалгуни', ruler: 'Su', description: '' },
    { name: 'Хаста', ruler: 'Mo', description: '' },
    { name: 'Читра', ruler: 'Ma', description: '' },
    { name: 'Свати', ruler: 'Ra', description: '' },
    { name: 'Вишакха', ruler: 'Ju', description: '' },
    { name: 'Анурадха', ruler: 'Sa', description: '' },
    { name: 'Джйештха', ruler: 'Me', description: '' },
    { name: 'Мула', ruler: 'Ke', description: '' },
    { name: 'Пурвашадха', ruler: 'Ve', description: '' },
    { name: 'Уттарашадха', ruler: 'Su', description: '' },
    { name: 'Шравана', ruler: 'Mo', description: '' },
    { name: 'Дхаништха', ruler: 'Ma', description: '' },
    { name: 'Шатабхиша', ruler: 'Ra', description: '' },
    { name: 'Пурвабхадрапада', ruler: 'Ju', description: '' },
    { name: 'Уттарабхадрапада', ruler: 'Sa', description: '' },
    { name: 'Ревати', ruler: 'Me', description: '' }
  ]
  return nakshatras[number - 1]
}