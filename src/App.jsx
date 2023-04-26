import "./assets/styles.css";

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./components/Info";
import SettingsPanel from "./components/Settings";
import { calendarOptions } from "./data/fcOptions";

export const AppContext = React.createContext();

function App() {
  const calendarRef = useRef();
  const [date, setDate] = useState(() => Date.now());
  const [nakshatra, setNakshatra] = useState(
    localStorage.getItem("nakshatra") || null
  );

  let options = {
    ...calendarOptions,
    eventClick: (eventInfo) => {
      setDate(eventInfo.event.startStr);
    },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      setDate(info.dateStr);
      handleTap(info.dateStr);
    },
  };

  const handleTap = (date) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.select(date);
  };

  return (
    <AppContext.Provider value={{ nakshatra, setNakshatra }}>
      <SettingsPanel />
      <FullCalendar ref={calendarRef} {...options} />
      <Info date={date} />
    </AppContext.Provider>
  );
}

export default App;
