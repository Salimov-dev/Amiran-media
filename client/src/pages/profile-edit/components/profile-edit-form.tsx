// MUI
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const ProfileEditForm = ({ data, onSubmit, onChange }) => {
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

      <ButtonStyled type="submit">Сохранить</ButtonStyled>
    </form>
  );
};

export default ProfileEditForm;
