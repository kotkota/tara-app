import React, { useState, useEffect, useContext } from "react";
import { MhahPanchang } from "mhah-panchang";
import InfoModule from "./InfoModule";
import { events } from "../data/events";
import { nakshatras } from "../data/nakshatra";
import { tithis } from "../data/tithi";
import { AppContext } from "./AppContext";

let mhah = new MhahPanchang();

export default function Info({ date }) {
  const [texts, setTexts] = useState(getDayInfo());
  const { nakshatra } = useContext(AppContext);

  useEffect(() => {
    setTexts(getDayInfo(date));
  }, [date, nakshatra]);

  function getDayInfo(time_ms = Date.now()) {
    let panchang = mhah.calculate(new Date(time_ms));
    let Tithi = panchang.Tithi;
    let Nakshatra = panchang.Nakshatra;
    // console.log("panchang: ", panchang);

    const dayTitles = getStoredEventsByDate(time_ms, events);
    const storedNakshatra = localStorage.getItem("nakshatra");
    // const storedNakshatra = nakshatra;

    const taraBala = getTaraBala(Nakshatra.ino + 1, storedNakshatra);
    const nakshatra = nakshatras[Nakshatra.ino];
    const tithi = tithis[Tithi.ino];
    // console.log("nakshatra ends: ", Nakshatra.end);

    return [
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
        subTitle: `${tithi.type} / ${formatDate(Tithi.end)}`,
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
        description: nakshatra.description,
        subTitle: formatDate(Nakshatra.end),
      },
    ];
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

    console.log(`time: ${time.toLocaleString()}`);

    return time;
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
    // console.log("userNakshatra", userNakshatra);
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

  function formatDate(time) {
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
