// libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// MUI
import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../entities/user/store/users-store";
// components
import UserMenu from "./components/user-menu";
import Loader from "../loader";
import { setSearchQuery } from "../../shared/redux/store/search-query-store";
import SearchField from "./components/search-field";

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  position: fixed;
  z-index: 1;
  width: 100%;
  justify-content: space-between;
  padding: 15px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.4);
  background: linear-gradient(to top, #cecece, #e1e1e1);
  & label.Mui-focused {
    color: gray;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: gray;
    }
    &:hover fieldset {
      border-color: gray;
    }
  }
`;

const Appbar = () => {
  const [data, setData] = useState("");
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldHideButton = location.pathname === "/note/create";
  const shouldHideSearch = location.pathname === "/auth/login" || location.pathname === "/auth/signup";

  const handleGoToLogin = () => {
    navigate("auth/login");
  };

  const handleCreateNote = () => {
    navigate("note/create");
  };

  useEffect(() => {
    dispatch(setSearchQuery(data));
  }, [data]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <ToolbarStyled>
          {!shouldHideSearch && <SearchField data={data} setData={setData} />}

          {currentUser ? (
            <Button
              onClick={handleCreateNote}
              variant="contained"
              disabled={shouldHideButton}
            >
              Добавить статью
            </Button>
          ) : (
            shouldHideButton && <Loader />
          )}

          {!isLoading ? (
            <>
              {currentUser ? (
                <UserMenu currentUser={currentUser} />
              ) : (
                !shouldHideSearch && <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGoToLogin}
                >
                  Войти
                </Button>
              )}
            </>
          ) : (
            <Loader />
          )}
        </ToolbarStyled>
      </AppBar>
    </Box>
  );
};

export default Appbar;
