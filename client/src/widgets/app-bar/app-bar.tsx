import { AppBar, Box, Toolbar, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

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
          <Button variant="outlined" color="primary">
            Войти
          </Button>
        </ToolbarStyled>
      </AppBar>
    </Box>
  );
};

export default Appbar;
