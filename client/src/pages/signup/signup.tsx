import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../entities/user/store/users-store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const AuthForm = styled(Paper)`
  margin-top: 50px;
  padding: 20px 20px 50px 20px;
  width: 400px;
`;

const Title = styled(Box)`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

const Enter = styled(Button)`
  margin-top: 20px;
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
`;

const Account = styled(Box)`
  display: flex;
  gap: 6px;
`;

const BackButton = styled(Box)`
  padding: 20px 0 0 20px;
`;

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры")
//     .required("Имя обязательно для заполнения"),
//   email: yup
//     .string()
//     .email("Введите email корректно")
//     .required("Email обязателен для заполнения"),
//   password: yup
//     .string()
//     .min(8, "Слишком короткий пароль - введите не менее 8 символов")
//     // .minLowercase(
//     //   1,
//     //   "Пароль должен содержать минимум 1 символ в нижнем регистре"
//     // )
//     // .minUppercase(
//     //   1,
//     //   "Пароль должен содержать минимум 1 символ в вверхнем регистре"
//     // )
//     // .minNumbers(1, "Пароль должен содержать минимум 1 цифру")
//     .required("Пароль обязателен для заполнения"),
// });

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch(signUp(data));
    dispatch(login({ payload: data }));
    navigate("/");
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate("login");
  };

  return (
    <>
      <BackButton>
        <Button onClick={handleNavigate}>Назад</Button>
      </BackButton>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Зарегистрироваться</Typography>
          </Title>

          <form
            onSubmit={handleSubmit}
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
              onChange={handleChange}
            />
            <TextField
              label="E-mail"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <TextField
              label="Пароль"
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
            />

            <Enter type="submit" variant="contained">
              Отправить
            </Enter>

            <Account>
              <Typography>Есть аккаунт?</Typography>
              <LinkStyled onClick={handleClick}>Войти</LinkStyled>
            </Account>
          </form>
        </AuthForm>
      </Component>
    </>
  );
};

export default SignUp;
