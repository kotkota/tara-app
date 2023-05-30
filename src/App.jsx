import "./assets/styles.css";
import React, { lazy, Suspense } from "react";
// import TaraCalendar from "./components/TaraCalendar";
import SettingsPanel from "./components/Settings";
// import Info from "./components/Info";
import { AppContextProvider } from "./components/AppContext";

const TaraCalendar = lazy(() => import("./components/TaraCalendar"));
const Info = lazy(() => import("./components/Info"));

function App() {
  return (
    <AppContextProvider>
      <SettingsPanel />
      <Suspense
        fallback={
          <>
            <div class="fc">
              <div class="fc-multimonth-title">...</div>
            </div>
            <div class="module tithi">
              <div class="MuiBox-root">
                <span class="module_category">…</span>
              </div>
              <h3 class="module_title">
                <span>…</span>
              </h3>
            </div>
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
