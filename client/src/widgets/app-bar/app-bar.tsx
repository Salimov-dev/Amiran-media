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

const TextFieldContainer = styled.div`
  position: relative;
  min-width: 200px; /* Set your desired minimum width here */
`;

const Appbar = () => {
  const [data, setData] = useState("");
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldHideButton = location.pathname === "/note/create";

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
          <TextFieldContainer>
            <TextField
              id="search"
              label="Найти статью"
              variant="outlined"
              size="small"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            {data && (
              <InputAdornment position="end">
                <ClearOutlinedIcon
                  sx={{
                    color: "gray",
                    width: "20px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "10px",
                  }}
                  onClick={() => setData("")}
                />
              </InputAdornment>
            )}
          </TextFieldContainer>

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
                <Button
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
