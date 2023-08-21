import './assets/styles.css'
import React, { lazy, Suspense } from 'react'
// import TaraCalendar from "./components/TaraCalendar";
import SettingsPanel from './components/Settings'
// import Info from "./components/Info";
import { AppContextProvider } from './components/AppContext'

const TaraCalendar = lazy(() => import('./components/TaraCalendar'))
const Info = lazy(() => import('./components/Info'))

function App() {
  return (
    <AppContextProvider>
      <SettingsPanel />
      <Suspense
        fallback={
          <>
            <div className="fc">
              <div className="fc-multimonth-title">...</div>
            </div>
            <div className="module tithi">
              <div className="MuiBox-root">
                <span className="module_category">…</span>
              </div>
              <h3 className="module_title">
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
  )
}

export default App
