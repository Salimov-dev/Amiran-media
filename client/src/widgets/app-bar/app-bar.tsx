import {
  AppBar,
  Box,
  Toolbar,
  Button,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserData,
  logOut,
} from "../../entities/user/store/users-store";

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

const UserMenu = styled(Box)`
  display: flex;
  gap: 12px;
`;

const UserName = styled(Typography)`
  color: gray;
`;

const Avatar = styled(`img`)({
  width: "30px",
  borderRadius: "50%",
  marginRight: "10px",
});

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useSelector(getCurrentUserData());
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate(`/user/${currentUser._id}`);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch(logOut());
  };

  const handleGoToLogin = () => {
    navigate("auth/login");
  };

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
          {currentUser ? (
            <UserMenu>
              <Button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar src={currentUser.image} />
                <UserName>{currentUser.name}</UserName>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleOpenProfile}>Профиль</MenuItem>
                <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
              </Menu>
            </UserMenu>
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
