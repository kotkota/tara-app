import React, { useState, createContext } from "react";
// import { useLocalStorage } from "../hooks/useStorage";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [nakshatra, setNakshatra] = useState(
    localStorage.getItem("nakshatra") || null,
  );
  const [date, setDate] = useState(() => Date.now());
  const [period, setPeriod] = useState(
    JSON.parse(localStorage.getItem("period")) || { cycle: 29, duration: 5 },
  );
  const [periodStartDate, setPeriodStartDate] = useState(
    localStorage.getItem("periodStartDate") || "2023-04-20",
  );
  return (
    <AppContext.Provider
      value={{
        nakshatra,
        setNakshatra,
        periodStartDate,
        setPeriodStartDate,
        period,
        setPeriod,
        date,
        setDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
