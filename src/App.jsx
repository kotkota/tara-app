import "./styles.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./Info";
import SettingsPanel from "./SettingsPanel";
import * as t from "./TaraUtils";

function App() {
  const [texts, setTexts] = useState(() => t.initTexts());

  useEffect(() => {
    t.getDayInfo(new Date().getTime(), setTexts);
  }, []);

  let options = {
    ...t.calendarOptions,
    eventClick: (eventInfo) => {
      // console.log(eventInfo)
      // console.log(eventInfo.event)
      t.getDayInfo(eventInfo.event.startStr, setTexts);
    },
    viewDidMount: (view) => {
      // console.log(view)
      // t.getDayInfo(new Date().getTime(), setTexts)
    },
    dateClick: (info) => {
      console.log(info.dateStr);
      t.getDayInfo(info.dateStr, setTexts);
      // info.dayEl.style.backgroundColor = 'ghostwhite'
    },
  };

  return (
    <>
      <FullCalendar {...options} />
      <Info texts={texts} />
      <SettingsPanel />
    </>
  );
}

export default App;
