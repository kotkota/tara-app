import "./assets/styles.css";

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import Info from "./components/Info";
import SettingsPanel from "./components/Settings";
import { AppContext } from "./components/AppContext";
import { calendarOptions } from "./data/fcOptions";
import { events } from "./data/events";

// export const AppContext = React.createContext();

function formatDate(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function App() {
  const calendarRef = useRef();
  const [nakshatra, setNakshatra] = useState(
    localStorage.getItem("nakshatra") || null
  );
  const [date, setDate] = useState(() => Date.now());
  const periodDuration = localStorage.getItem("periodDuration") || 29;
  const [periodStartDate, setPeriodStartDate] = useState(
    localStorage.getItem("periodStartDate") || "2023-04-20"
  );

  let options = {
    ...calendarOptions,
    // eventClick: (eventInfo) => {
    //   setDate(eventInfo.event.startStr);
    // },
    viewDidMount: (view) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      setDate(info.dateStr);
      handleTap(info.dateStr);
    },
    events: [
      ...events,
      {
        title: "rrule event",
        rrule: {
          // dtstart: "2023-03-30",
          dtstart: formatDate(periodStartDate),
          until: "2024-01-01",
          freq: "daily",
          interval: periodDuration,
        },
        duration: "120:00:00",
        display: "background",
        allDay: true,
        backgroundColor: "#ffdab9",
        // color: "#deb887",
        classNames: "period",
      },
    ],
  };

  const handleTap = (date) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.select(date);
  };

  return (
    <AppContext.Provider
      value={{ nakshatra, setNakshatra, periodStartDate, setPeriodStartDate }}
    >
      <SettingsPanel />
      <FullCalendar ref={calendarRef} {...options} />
      <Info date={date} />
    </AppContext.Provider>
  );
}

export default App;
