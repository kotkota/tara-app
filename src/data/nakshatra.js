export const nakshatras = [
  {
    id: "1",
    name: "Ашвини",
    ruler: "Кету",
    shakti: "Сила быстрого исцеления и достижение целей",
  },
  {
    id: "2",
    name: "Бхарани",
    ruler: "Венера",
    shakti: "Сила удаления и очищения",
  },
  {
    id: "3",
    name: "Криттика",
    ruler: "Солнце",
    shakti: "Сила мотивировать, управлять, организовывать процессы",
  },
  {
    id: "4",
    name: "Рохини",
    ruler: "Луна",
    shakti: "Сила выращивать и созидать",
  },
  {
    id: "5",
    name: "Мригашира",
    ruler: "Марс",
    shakti: "Сила получать удовлетворение, искать и убегать",
  },
  {
    id: "6",
    name: "Ардра",
    ruler: "Раху",
    shakti: "Сила достижения поставленных целей",
  },
  {
    id: "7",
    name: "Пунарвасу",
    ruler: "Юпитер",
    shakti: "Сила достигать изобилия и устойчивости",
  },
  {
    id: "8",
    name: "Пушья",
    ruler: "Сатурн",
    shakti: " Сила открытия божественной энергии",
  },
  {
    id: "9",
    name: "Ашлеша",
    ruler: "Меркурий",
    shakti:
      "Сила причинять страдания, мудрость преодолевать врагов и препятствия",
  },
  {
    id: "10",
    name: "Магха",
    ruler: "Кету",
    shakti: "Сила понимать связи в роду, работа со смертью и перерождением",
  },
  {
    id: "11",
    name: "Пурвапхалгуни",
    ruler: "Венера",
    shakti: "Сила генерировать, производить, рождать",
  },
  {
    id: "12",
    name: "Уттарапхалгуни",
    ruler: "Солнце",
    shakti: "Сила процветания через создание союза",
  },
  {
    id: "13",
    name: "Хаста",
    ruler: "Луна",
    shakti: "Сила мастерства, сила получения желаемого в свои руки",
  },
  {
    id: "14",
    name: "Читра",
    ruler: "Марс",
    shakti: "Сила накапливать заслуги и достижения",
  },
  { id: "15", name: "Свати", ruler: "Раху", shakti: "Сила рассеивания" },
  {
    id: "16",
    name: "Вишакха",
    ruler: "Юпитер",
    shakti: "Сила достигать желаемое",
  },
  {
    id: "17",
    name: "Анурадха",
    ruler: "Сатурн",
    shakti: "Сила поклонения и служения",
  },
  {
    id: "18",
    name: "Джйештха",
    ruler: "Меркурий",
    shakti: "Сила завоевывать и преодолевать",
  },
  {
    id: "19",
    name: "Мула",
    ruler: "Кету",
    shakti: "Сила разрушения до корней, сила дробить на части",
  },
  {
    id: "20",
    name: "Пурвашадха",
    ruler: "Венера",
    shakti: "Сила воодушевлять, придавать силы, сила распространения славы",
  },
  {
    id: "21",
    name: "Уттарашадха",
    ruler: "Солнце",
    shakti: "Сила легкой победы, которая достигается в сотрудничестве",
  },
  {
    id: "22",
    name: "Шравана",
    ruler: "Луна",
    shakti: "Сила установления различных связей",
  },
  {
    id: "23",
    name: "Дхаништха",
    ruler: "Марс",
    shakti: "Сила изобилия и славы",
  },
  {
    id: "24",
    name: "Шатабхиша",
    ruler: "Раху",
    shakti:
      "Сила долгосрочного исцеления в трех мирах: небесном, земном и низшем",
  },
  {
    id: "25",
    name: "Пурва­бхадра­пада",
    ruler: "Юпитер",
    shakti: "Сила поднять уровень эволюции через внутреннее очищение",
  },
  {
    id: "26",
    name: "Уттара­бхадра­пада",
    ruler: "Сатурн",
    shakti: "Сила управления дождями",
  },
  {
    id: "27",
    name: "Ревати",
    ruler: "Меркурий",
    shakti: "Сила поддерживать и питать",
  },
];
export function nakshatraByNum(number) {
  return nakshatras[number - 1];
}
