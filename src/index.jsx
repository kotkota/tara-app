import * as ReactDOMClient from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

serviceWorkerRegistration.register();
reportWebVitals(console.log);
