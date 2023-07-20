import { CssBaseline } from "@mui/material";
import Notes from "../pages/notes/notes";
import AppLoader from "../processes/hoc/app-loader";
import Appbar from "../widgets/app-bar/app-bar";

function App() {
  return (
    <AppLoader>
      <CssBaseline />
      <Appbar/>
      <Notes />
    </AppLoader>
  );
}

export default App;
