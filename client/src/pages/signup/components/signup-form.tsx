import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import HasAccount from "./account-info";

const Enter = styled(Button)`
  margin-top: 20px;
`;

const SignUpForm = ({
  data,
  onSubmit,
  onChange,
  errors,
  register,
  isFormValid,
}) => {
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
        {...register("name")}
        label="Имя"
        id="name"
        name="name"
        value={data.name}
        onChange={onChange}
        error={!!errors?.name}
        helperText={errors?.name?.message}
      />
      <TextField
        {...register("email")}
        label="E-mail"
        id="email"
        name="email"
        value={data.email}
        onChange={onChange}
        error={!!errors?.email}
        helperText={errors?.email?.message}
      />
      <TextField
        {...register("password")}
        label="Пароль"
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={onChange}
        error={!!errors?.password}
        helperText={errors?.password?.message}
      />

      <Enter type="submit" variant="contained" disabled={!isFormValid}>
        Отправить
      </Enter>

      <HasAccount />
    </form>
  );
};

export default SignUpForm;
