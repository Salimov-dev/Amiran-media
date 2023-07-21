import AccountLogin from "./account-info";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

const Enter = styled(Button)`
  margin-top: 20px;
`;

const LoginForm = ({ data, onSubmit, onChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        padding: "20px",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        label="E-mail"
        id="email"
        name="email"
        value={data.email}
        onChange={onChange}
      />
      <TextField
        label="Пароль"
        id="password"
        name="password"
        value={data.password}
        onChange={onChange}
      />
      <Enter type="submit" variant="contained">
        Войти
      </Enter>
      <AccountLogin />
    </form>
  );
};

export default LoginForm;
