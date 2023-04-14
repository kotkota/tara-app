import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { events } from "./events";
import { nakshatraByNum } from "./nakshatras";

function getCurrentTime(time_ms = new Date().getTime()) {
  const time = new Date(time_ms);
  // const hour = time.getHours();
  const hour = 12;
  const min = time.getMinutes();
  const day = time.getDate();
  const month = time.getMonth() + 1; // Добавляем 1, т.к. getMonth() возвращает индекс месяца (0-11)
  const year = time.getFullYear();
  const lat = "-8.65"; // Широта вашего местоположения
  const lon = "115.22"; // Долгота вашего местоположения
  const tzone = time.getTimezoneOffset() / -60; // Часовой пояс вашего местоположения
  const city = "Denpasar, ID"; // Город вашего местоположения

  return JSON.stringify({
    Hour: hour,
    Min: min,
    Day: day,
    Month: month,
    Year: year,
    Lat: lat,
    Lon: lon,
    Tzone: tzone,
    city: city,
  });
}

function getTaraBala(todayNakshatra, userNakshatra) {
  const tb = [
    { name: "Джанма", description: "Опасность для тела. Негативно" },
    { name: "Сампат", description: "Богатство и процветание. Благоприятно" },
    { name: "Випат", description: "Потери и несчастные случаи. Негативно" },
    { name: "Кшема", description: "Процветание. Благоприятно" },
    { name: "Пратйак", description: "Препятствия и затруднение. Негативно" },
    { name: "Садхана", description: "Реализация притязаний. Очень хорошо" },
    {
      name: "Наидхана",
      description: "Опасности, несчастные случаи. Очень негативно",
    },
    { name: "Митра", description: "Указывает хорошее. Благоприятно" },
    { name: "Парама митра", description: "Лучший друг. Очень благоприятно" },
  ];
  return tb[(27 - userNakshatra + todayNakshatra) % 9];
}

function msToDate(time) {
  let date = new Date(time);
  return date.toLocaleString("en-gb", {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
  });
}

export function getEventTitlesByDate(date, events) {
  const matchingEvents = events.filter((event) => {
    const eventStartDate = new Date(event.start).toLocaleDateString();
    const eventEndDate = new Date(event.end).toLocaleDateString();
    const requestedDate = new Date(date).toLocaleDateString();
    return eventStartDate === requestedDate || eventEndDate === requestedDate;
  });

  return matchingEvents.map((event) => event.title).join("\n");
}

export const calendarOptions = {
  initialView: "multiMonthYear",
  plugins: [multiMonthPlugin, interactionPlugin],
  events: { events },
  multiMonthMaxColumns: 1,
  locale: "ru",
  firstDay: 1,
  nextDayThreshold: "09:00:00",
  eventColor: "firebrick",
  headerToolbar: {
    left: "",
    center: "",
    right: "",
  },
};

export async function getDayInfo(time_ms = new Date().getTime(), callback) {
  let time = getCurrentTime(time_ms);
  let texts;

  const dayTitles = getEventTitlesByDate(time_ms, events);
  // console.log(dayTitles); // ["New Moon"]

  await fetch(
    "https://www.astroyogi.com/contentsyn/kundli/gettithidetails?objStr=" +
      encodeURIComponent(time)
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let taraBala = getTaraBala(data.data.nakshatra.details.nak_number, 21);
      let nakshatra = nakshatraByNum(data.data.nakshatra.details.nak_number);
      texts = [
        {
          class: "module__wide today",
          title: new Date(time_ms).toLocaleString("ru", { dateStyle: "long" }),
          description: dayTitles,
        },
        {
          class: "tithi",
          category: "Титхи",
          title: data.data.tithi.details.special.split(" ")[0],
          titleExtra:
            data.data.tithi.details.tithi_number < 16
              ? `${data.data.tithi.details.tithi_number}↑`
              : // : data.data.tithi.details.tithi_number == 15
                // ? `${data.data.tithi.details.tithi_number}🌕`
                // : data.data.tithi.details.tithi_number == 30
                // ? `${data.data.tithi.details.tithi_number}🌑`
                `${data.data.tithi.details.tithi_number - 15}↓`,
          description: data.data.tithi.details.summary,
          ends: msToDate(data.data.tithi.end_time_ms),
        },
        {
          class: "tarabala",
          category: "Тара Бала",
          title: taraBala.name,
          titleExtra: "",
          description: taraBala.description,
        },
        {
          class: "module__wide nakshatra",
          category: "Накшатра",
          title: nakshatra.name,
          titleExtra: data.data.moon_sign,
          description: data.data.nakshatra.details.summary,
          ends: msToDate(data.data.nakshatra.end_time_ms),
        },
      ];
      callback(texts);
    })
    .catch((error) => console.error(error));
}

export function initTexts() {
  const dayTitles = getEventTitlesByDate(new Date().getTime(), events);
  return [
    {
      class: "module__wide today",
      title: new Date().toLocaleString("ru", { dateStyle: "long" }),
      description: dayTitles,
    },
    // {
    //   class: "tithi",
    //   category: "Титхи",
    //   title: "●●●●●",
    //   titleExtra: "◦◦↑",
    //   description:
    //     "●●●● ●●● ●●●●●●●●●●● ●● ●●●● ●●●●●●● ●●●●●●●● ●● ●●●●● ●●● ●●●● ●● ●●●●● ●●● ●●●●●●●●● ●●●●●●●●",
    // },
    // {
    //   class: "tarabala",
    //   category: "Тара Бала",
    //   title: "●●●●●",
    //   description: "●●●●● ●●● ●●●●●●●●● ●●●●●●●●",
    // },
    // {
    //   class: "nakshatra",
    //   category: "Накшатра",
    //   title: "●●●●●●●●",
    //   titleExtra: "◦◦◦◦",
    //   description:
    //     "●●●● ●●● ●●●●●●●●●●● ●● ●●●● ●●●●●●● ●●●●●●●● ●● ●●●●● ●●● ●●●● ●● ●●●●● ●●● ●●●●●●●●● ●●●●●●●●",
    // },
  ];
}
