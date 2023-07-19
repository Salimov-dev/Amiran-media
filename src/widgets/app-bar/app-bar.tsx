import { AppBar, Box, Toolbar, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: linear-gradient(to top, #cecece, #e1e1e1);
`;

const Appbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
