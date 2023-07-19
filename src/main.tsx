import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { createStore } from "./shared/redux/store/create-store.ts";
const store = createStore();
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
