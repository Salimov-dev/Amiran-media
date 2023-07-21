import {  Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import HasAccount from "./account-info";

const Enter = styled(Button)`
  margin-top: 20px;
`;

const SignUpForm = ({ data, onSubmit, onChange }) => {
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
        label="Имя"
        id="name"
        name="name"
        value={data.name}
        onChange={onChange}
      />
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
        type="password"
        value={data.password}
        onChange={onChange}
      />

      <Enter type="submit" variant="contained">
        Отправить
      </Enter>

      <HasAccount />
    </form>
  );
};

export default SignUpForm;
