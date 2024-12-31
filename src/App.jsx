import "./assets/styles.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
// import TaraCalendar from "./components/TaraCalendar";
// import Info from "./components/Info";
import SettingsPanel from "./components/Settings";
import WelcomeModal from "./components/WelcomeInfo";
import { AppContextProvider } from "./components/AppContext";

const TaraCalendar = lazy(() => import("./components/TaraCalendar"));
const Info = lazy(() => import("./components/Info"));

function App() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsWelcomeOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closeModal = () => {
    setIsWelcomeOpen(false);
  };

  return (
    <AppContextProvider>
      <WelcomeModal isOpen={isWelcomeOpen} onClose={closeModal} />
      <SettingsPanel />
      <Suspense
        fallback={
          <>
            <div class="tara-calendar module__wide">
              <div class="fc"></div>
              <div class="module today" style={{ height: 44 }}></div>
            </div>
            <div className="module tithi" style={{ height: 100 }}></div>
            <div className="module nakshatra" style={{ height: 100 }}></div>
            <div
              className="module tarabala module__wide"
              style={{ height: 100 }}
            ></div>
          </>
        }
      >
        <TaraCalendar />
        <Info />
      </Suspense>
    </AppContextProvider>
  );
}

export default App;
