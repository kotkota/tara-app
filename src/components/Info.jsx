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
        <p>Титхи — это лунный день. Титхи отсчитываются от новолуния и пронумерованы от 1↑ до 15↑ до полнолуния (растущая Луна) и от 1↓ до 15↓ после полнолуния (убывающая Луна).</p>
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
        categoryDescription:
          "Тара-Бала — это сила накшатры. Она отражает благоприятность или неблагоприятность периода текущей накшатры. Рассчитывается индивидуально на основе натального положения Луны.",
        title: taraBala.name,
        titleExtra: "",
        description: taraBala.description,
      },
      {
        class: "module__wide nakshatra",
        category: "Накшатра",
        categoryDescription: `
          <p>Накшатры — это язык звезд, через который древние мудрецы пытались расшифровать смысл жизни. Возможно, получится и у вас.</p>
          <p>Всего накшатр 27. Рядом с названием накшатры указан её управитель, который дает понимание того, как и зачем накшатра действует, распаковывая самскары (отпечатки прошлого) в нашем сознании.</p>
          <p>В описании накшатры представлена её сила или шакти.</p>
          <p>Зная силу накшатры дня вы можете осознанно использовать её в своих делах в этот день и прокачивать её в себе.</p>
          <p>Например, если вам хочется прокачать силу достижения, это благоприятно делать в накшатру Вишакха, прокачать силу служения — в накшатру Анурадха. По такому же принципу вы можете контролировать силу, если она у вас в избытке. Например, если вы по природе рассеяны, в день накшатры Свати стоит быть осторожнее.</p>
          `,
        title: todayNakshatra.name,
        titleExtra: todayNakshatra.ruler,
        description: todayNakshatra.shakti,
        subTitle: formatDate(Nakshatra.end),
      },
    ];
  }

  function getTaraBala(todayNakshatra, userNakshatra) {
    let result;
    const tb = [
      { name: "Джанма", description: "Опасность для тела" },
      { name: "Сампат", description: "Богатство и процветание. Благоприятно" },
      { name: "Випат", description: "Потери и несчастные случаи" },
      { name: "Кшема", description: "Процветание. Благоприятно" },
      { name: "Пратйак", description: "Препятствия и затруднение" },
      { name: "Садхана", description: "Реализация притязаний. Очень хорошо" },
      {
        name: "Наидхана",
        description: "Опасности, несчастные случаи",
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
