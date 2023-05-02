import "./assets/styles.css";
import React from "react";
import TaraCalendar from "./components/TaraCalendar";
import SettingsPanel from "./components/Settings";
import Info from "./components/Info";
import { AppContextProvider } from "./components/AppContext";

function App() {
  return (
    <AppContextProvider>
      <SettingsPanel />
      <TaraCalendar />
      <Info />
    </AppContextProvider>
  );
}

export default App;
