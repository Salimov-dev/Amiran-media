import { CssBaseline } from "@mui/material";
import Notes from "../pages/notes/notes";
import AppLoader from "../processes/hoc/app-loader";
import Appbar from "../widgets/app-bar/app-bar";
import ScrollToTop from "../shared/utils/scroll-to-top";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import SignUp from "../pages/signup/signup";

function App() {
  return (
    <AppLoader>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Appbar />
        <Routes>
          <Route index path="" element={<Notes />} />

          <Route path="auth" element={<Login />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path={"login"} element={<Login />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>

          <Route path="auth" element={<SignUp />}>
            <Route index element={<Navigate to="/auth/SignUp" />} />
            <Route path={"signup"} element={<SignUp />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AppLoader>
  );
}

export default App;
