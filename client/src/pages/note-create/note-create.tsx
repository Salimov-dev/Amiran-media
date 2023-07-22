// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import styled from "@emotion/styled";
import { Box, Button, Typography, Paper } from "@mui/material";
// store
import { createNote } from "../../entities/note/store/notes-store";
import { getCurrentUserData } from "../../entities/user/store/users-store";
import { getCategoriesList } from "../../entities/categories/store/categories-store";
// components
import NoteCreateForm from "./components/note-create-form";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f9f9f7;
`;

const AuthForm = styled(Paper)`
  padding: 20px 20px 50px 20px;
  width: 800px;
`;

const Title = styled(Box)`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

const BackButton = styled(Box)`
  padding: 20px 0 0 20px;
`;

const schema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Минимум 10 символов")
    .max(20, "Максимум 30 символов")
    .required("Имя обязательно для заполнения"),
  content: yup
    .string()
    .min(10, "Минимум 15 символов")
    .max(500, "Максимум 5000 символов")
    .required("Фамилия обязательна для заполнения"),
});

const NoteCreate = () => {
  const {
    register,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({ title: "", content: "", category: "" });
  const currentUserData = useSelector(getCurrentUserData());
  const categories = useSelector(getCategoriesList());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleNavigate = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createNote({
        ...data,
        userId: currentUserData._id,
      })
    );

    navigate("/");
  };

  const isCategorySelected = !!data.category;
  const isFormValid = formState.isValid && isCategorySelected;

  return (
    <Box sx={{ marginTop: "75px" }}>
      <BackButton>
        <Button onClick={handleNavigate}>
          <KeyboardArrowLeftOutlinedIcon />
          Назад к статьям
        </Button>
      </BackButton>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Напишите свою статью</Typography>
          </Title>
          <NoteCreateForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
            categories={categories}
            errors={errors}
            register={register}
            isFormValid={isFormValid}
          />
        </AuthForm>
      </Component>
    </Box>
  );
};

export default NoteCreate;
