import "./styles.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./Info";
import SettingsPanel from "./Settings";
import * as t from "./TaraUtils";

export const AppContext = React.createContext();

function App() {
  const [date, setDate] = useState(() => Date.now());
  const [nakshatra, setNakshatra] = useState(
    localStorage.getItem("nakshatra") || null
  );

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
    <AppContext.Provider value={{ nakshatra, setNakshatra }}>
      <SettingsPanel />
      <FullCalendar {...options} />
      <Info date={date} />
    </AppContext.Provider>
  );
}

export default App;
