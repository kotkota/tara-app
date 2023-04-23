import "./styles.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./Info";
import SettingsPanel from "./Settings";
import * as t from "./TaraUtils";

function App() {
  const [date, setDate] = useState(() => Date.now());

  let options = {
    ...t.calendarOptions,
    eventClick: (eventInfo) => {
      setDate(eventInfo.event.startStr);
    },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      setDate(info.dateStr);
    },
  };

  return (
    <>
      <SettingsPanel />
      <FullCalendar {...options} />
      <Info date={date} />
    </>
  );
}

export default App;
