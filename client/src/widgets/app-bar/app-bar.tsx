// libraries
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import styled from "@emotion/styled";
import { AppBar, Box, Toolbar, Button, TextField } from "@mui/material";
// store
import { getCurrentUserData } from "../../entities/user/store/users-store";
// components
import UserMenu from "./components/user-menu";

const ToolbarStyled = styled(Toolbar)`
  display: flex;
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
  const currentUser = useSelector(getCurrentUserData());
  const navigate = useNavigate();
  

  const handleGoToLogin = () => {
    navigate("auth/login");
  };

  const handleCreateNote = () => {
    navigate("note/create")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <ToolbarStyled>
          <TextField
            id="search"
            label="Найти статью"
            variant="outlined"
            size="small"
          />

          {currentUser && <Button onClick={handleCreateNote} variant="contained">Добавить статью</Button>}

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
        </ToolbarStyled>
      </AppBar>
    </Box>
  );
};

export default Appbar;
