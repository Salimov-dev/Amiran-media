import { CssBaseline } from "@mui/material";
import Notes from "../pages/notes/notes";
import AppLoader from "../processes/hoc/app-loader";

function App() {
  return (
    <AppLoader>
      <CssBaseline />
      <Notes />
    </AppLoader>
  );
}

export default App;
