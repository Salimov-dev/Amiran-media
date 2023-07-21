import { CssBaseline } from "@mui/material";
import Notes from "../pages/notes/notes";
import AppLoader from "../processes/hoc/app-loader";
import Appbar from "../widgets/app-bar/app-bar";
import ScrollToTop from "../shared/utils/scroll-to-top";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/login";
import SignUp from "../pages/signup/signup";
import Profile from "../pages/profile/profile";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ProfileEdit from "../pages/profile-edit/profile-edit";

const AppStyled = styled(Box)`
height: 100vh;
  background-color: #f9f9f7;
`;

function App() {
  return (
    <AppStyled>
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

            <Route path="user" >
              <Route index element={<Navigate to="/" />} />
              <Route path={":userId"} element={<Profile />} />
              <Route path={":userId/edit"} element={<ProfileEdit />} />
              <Route path="*" element={<Navigate to="" />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AppLoader>
    </AppStyled>
  );
}

export default App;
