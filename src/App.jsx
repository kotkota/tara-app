import "./assets/styles.css";
import React, { useState } from "react";
import { TaraCalendar } from "./components/TaraCalendar";
import SettingsPanel from "./components/Settings";
import Info from "./components/Info";
import { AppContext } from "./components/AppContext";

function App() {
  const [nakshatra, setNakshatra] = useState(
    localStorage.getItem("nakshatra") || null
  );
  const [date, setDate] = useState(() => Date.now());
  const [periodDuration, setPeriodDuration] = useState(
    localStorage.getItem("periodDuration") || 29
  );
  const [periodStartDate, setPeriodStartDate] = useState(
    localStorage.getItem("periodStartDate") || "2023-04-20"
  );

  return (
    <AppContext.Provider
      value={{
        nakshatra,
        setNakshatra,
        periodStartDate,
        setPeriodStartDate,
        periodDuration,
        setPeriodDuration,
        date,
        setDate,
      }}
    >
      <SettingsPanel />
      <TaraCalendar />
      <Info date={date} />
    </AppContext.Provider>
  );
}

export default App;
