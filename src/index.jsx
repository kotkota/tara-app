import * as ReactDOMClient from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("Service worker registered:", registration);
      })
      .catch((error) => {
        console.log("Service worker registration failed:", error);
      });
  });
}

root.render(<App />);
