import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { events } from "./events";
import { nakshatraByNum } from "./nakshatra";
import { tithiByNum } from "./tithi";

export function updateLocation() {
  let coords = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.latitude = position.coords.latitude.toFixed(2);
        coords.longitude = position.coords.longitude.toFixed(2);
        localStorage.setItem("location", JSON.stringify(coords));
        console.log("getCurrentPosition success", coords);
      },
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
      {
        enableHighAccuracy: false,
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  console.log("update result:", coords);
  return coords;
}

export function getLocation() {
  if (localStorage.getItem("location")) {
    console.log("getLoc returned storage");
    return JSON.parse(localStorage.getItem("location"));
  } else {
    console.log("getLoc requested update");
    return updateLocation();
  }
}

function getCurrentTime(time_ms = new Date()) {
  let time = new Date(time_ms);
  // Если дата прилетела не в миллисекундах (если был передан аргумент),
  // то выставляем время на полдень. В противном случае используем текущее время
  if (arguments[0].toString().length != 13) {
    time.setHours(12, 0);
  }
  let coords = getLocation();
  const hour = time.getHours();
  const min = time.getMinutes();
  const day = time.getDate();
  const month = time.getMonth() + 1; // Добавляем 1, т.к. getMonth() возвращает индекс месяца (0-11)
  const year = time.getFullYear();
  const lat = coords.latitude; // Широта вашего местоположения
  const lon = coords.longitude; // Долгота вашего местоположения
  const tzone = time.getTimezoneOffset() / -60; // Часовой пояс вашего местоположения
  const city = ""; // Город вашего местоположения

  console.log(
    `Hour: ${hour}, Min: ${min}, Day: ${day}, Month: ${month}, Year: ${year}, Lat: ${lat}, Lon: ${lon}, Tzone: ${tzone}, city: ${city}`
  );

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
  let result;
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
  console.log("userNakshatra", userNakshatra);
  if (isNaN(userNakshatra) || userNakshatra == null) {
    result = {
      name: "…",
      description: "Укажите свою накшатру Луны в настройках",
    };
  } else {
    result = tb[(27 - userNakshatra + todayNakshatra) % 9];
  }
  return result;
}

function msToDate(time) {
  let date = new Date(time);
  return (
    "до " +
    date.toLocaleString("en-gb", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
    })
  );
}

export function getEventTitlesByDate(date, events) {
  const matchingEvents = events.filter((event) => {
    const eventStartDate = new Date(event.start).toLocaleDateString();
    const eventEndDate = new Date(event.end).toLocaleDateString();
    const requestedDate = new Date(date).toLocaleDateString();
    return eventStartDate === requestedDate || eventEndDate === requestedDate;
  });

  return matchingEvents.map((event) => event.title).join(". ");
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
  let storedNakshatra = localStorage.getItem("nakshatra");

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
      let taraBala = getTaraBala(
        data.data.nakshatra.details.nak_number,
        storedNakshatra
      );
      let nakshatra = nakshatraByNum(data.data.nakshatra.details.nak_number);
      let tithi = tithiByNum(data.data.tithi.details.tithi_number);
      texts = [
        {
          class: "module__wide today",
          title: new Date(time_ms).toLocaleString("ru", { dateStyle: "long" }),
          description: dayTitles,
        },
        {
          class: "tithi",
          category: "Титхи",
          categoryDescription:
            "Титхи — это лунный день. В ведической астрологии титхи пронумерованы от 1 до 15 до полнолуния и от 1 до 15 после полнолуния. Например, 15 стрелочка вниз будет означать 30-й лунный день, а 15 стрелочка вверх — полнолуние.",
          title: tithi.name,
          titleExtra: tithi.number,
          description: `${tithi.type_description}. ${tithi.curator_description} `,
          subTitle: `${tithi.type} / ${msToDate(data.data.tithi.end_time_ms)}`,
        },
        {
          class: "tarabala",
          category: "Тара Бала",
          categoryDescription: "Кого-кого ты там тарабала!?",
          title: taraBala.name,
          titleExtra: "",
          description: taraBala.description,
        },
        {
          class: "module__wide nakshatra",
          category: "Накшатра",
          categoryDescription: "Страп-он, фраппе, крапива, пряники…",
          title: nakshatra.name,
          titleExtra: nakshatra.ruler,
          description: data.data.nakshatra.details.summary,
          subTitle: msToDate(data.data.nakshatra.end_time_ms),
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
  ];
}
