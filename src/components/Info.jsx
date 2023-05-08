import React, { useState, useEffect, useContext, useMemo } from "react";
import { MhahPanchang } from "mhah-panchang";
import InfoModule from "./InfoModule";
import { nakshatras } from "../data/nakshatra";
import { tithis } from "../data/tithi";
import { AppContext } from "./AppContext";

let mhah = new MhahPanchang();

export default function Info() {
  const { nakshatra, date } = useContext(AppContext);

  const [texts, setTexts] = useState([]);

  useEffect(() => {
    setTexts(getDayInfo(date));
  }, [date, nakshatra]);

  function getDayInfo(time_ms = Date.now()) {
    let panchang = mhah.calculate(new Date(time_ms));
    let Tithi = panchang.Tithi;
    let Nakshatra = panchang.Nakshatra;
    // console.log("panchang: ", panchang);

    // const storedNakshatra = localStorage.getItem("nakshatra");
    const storedNakshatra = nakshatra;
    const taraBala = getTaraBala(Nakshatra.ino + 1, storedNakshatra);
    const todayNakshatra = nakshatras[Nakshatra.ino];
    const tithi = tithis[Tithi.ino];
    // console.log("nakshatra ends: ", Nakshatra.end);

    return [
      {
        class: "tithi",
        category: "Титхи",
        categoryDescription: `
        <p>Титхи&nbsp;— это лунный день. В&nbsp;ведической астрологии титхи пронумерованы от&nbsp;1 до&nbsp;15 до&nbsp;полнолуния и&nbsp;от&nbsp;1 до&nbsp;15 после полнолуния. Например, 15↓ будет означать 30-й лунный день, а&nbsp;15↑&nbsp;— полнолуние.</p>
        <p>Растущая луна, стрелочка вверх.</p>
        <p>Убывающая луна, стрелочка вниз.</p>
        <h4>Тип титхи</h4>
        <p>Нанда, Бхадра, Джайя, Рикта, Пурна&nbsp;— 5 типов титхи, которые следуют один за&nbsp;одним и&nbsp;задают дополнительный ритм лунному циклу.</p>
        <div class="highlight">
          <p><strong>Нанда</strong>&nbsp;— счастье, умиротворение, праздник</p>
          <p><strong>Бхадра</strong>&nbsp;— успех, мудрость, богатство, польза</p>
          <p><strong>Джайя</strong>&nbsp;— победа, триумф, высшие достижения</p>
          <p><strong>Рикта</strong>&nbsp;— пустые руки, избавление от&nbsp;лишнего, ненужного</p>
          <p><strong>Пурна</strong>&nbsp;— полнота, завершение цикла, сбор урожая.</p>
        </div>
        <p>Выстраивания рода занятий по&nbsp;типу титхи позволит вам сонастроиться с&nbsp;природным законам и&nbsp;гармонизировать свою жизнь во&nbsp;всех сферах.</p>
        <p>Особенно я&nbsp;рекомендую уделить внимание типу титхи риктха&nbsp;— избавление от&nbsp;ненужного часто может быть болезненным процессом и&nbsp;потому требует особого фокуса.</p>
        `,
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
        categoryDescription:
          "<p>В скобках от названия накшатры указан её управитель, который сразу дает нам понимание того, как и зачем накшатра действует, распаковывая самскары (отпечатки прошлого) в нашем сознании.</p>",
        title: todayNakshatra.name,
        titleExtra: todayNakshatra.ruler,
        description: todayNakshatra.description,
        subTitle: formatDate(Nakshatra.end),
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
