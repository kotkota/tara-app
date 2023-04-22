import React, { useState, useEffect } from "react";
import InfoModule from "./InfoModule";
import { events } from "./events";
import { getLocation } from "./TaraUtils";
import { nakshatraByNum } from "./nakshatra";
import { tithiByNum } from "./tithi";

export default function Info({ date }) {
  const [texts, setTexts] = useState([
    {
      class: "module__wide today",
      title: new Date().toLocaleString("ru", { dateStyle: "long" }),
      description: getStoredEventsByDate(Date.now(), events),
    },
  ]);

  useEffect(() => {
    getDayInfo(date);
    console.log("texts: ", texts);
  }, [date]);

  async function getDayInfo(time_ms = Date.now()) {
    const time = getCurrentTime(time_ms);
    const dayTitles = getStoredEventsByDate(time_ms, events);
    const storedNakshatra = localStorage.getItem("nakshatra");

    try {
      const response = await fetch(
        "https://www.astroyogi.com/contentsyn/kundli/gettithidetails?objStr=" +
          encodeURIComponent(time)
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const taraBala = getTaraBala(
        data.data.nakshatra.details.nak_number,
        storedNakshatra
      );
      const nakshatra = nakshatraByNum(data.data.nakshatra.details.nak_number);
      const tithi = tithiByNum(data.data.tithi.details.tithi_number);

      const newTexts = [
        {
          class: "module__wide today",
          title: new Date(time_ms).toLocaleString("ru", {
            dateStyle: "long",
          }),
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
      setTexts(newTexts);
    } catch (error) {
      console.error(error);
    }
  }

  function getStoredEventsByDate(date, events) {
    const matchingEvents = events.filter((event) => {
      const eventStartDate = new Date(event.start).toLocaleDateString();
      const eventEndDate = new Date(event.end).toLocaleDateString();
      const requestedDate = new Date(date).toLocaleDateString();
      return eventStartDate === requestedDate || eventEndDate === requestedDate;
    });

    return matchingEvents.map((event) => event.title).join(". ");
  }

  function getCurrentTime(time_ms = new Date()) {
    let time = new Date(time_ms);
    if (time_ms.toString().length !== 13) {
      time.setHours(12, 0);
    }
    const coords = getLocation();
    const hour = time.getHours();
    const min = time.getMinutes();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const lat = coords.latitude;
    const lon = coords.longitude;
    const tzone = time.getTimezoneOffset() / -60;
    const city = "";

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

  function initTexts() {
    return [
      {
        class: "module__wide today",
        title: new Date().toLocaleString("ru", { dateStyle: "long" }),
        description: getStoredEventsByDate(Date.now(), events),
      },
    ];
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

  return texts.map((item) => {
    return <InfoModule key={item.class} text={item} />;
  });
}
