// libraries
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// MUI
import styled from "@emotion/styled";
import { Box, Button, Typography, Paper } from "@mui/material";
// store
import { login, signUp } from "../../entities/user/store/users-store";
// components
import SignUpForm from "./components/signup-form";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
    navigate("/");
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
          <SignUpForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </AuthForm>
      </Component>
    </>
  );
};

export default SignUp;
