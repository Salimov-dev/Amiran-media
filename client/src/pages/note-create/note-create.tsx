// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import styled from "@emotion/styled";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import { createNote } from "../../entities/note/store/notes-store";
import { getCurrentUserData } from "../../entities/user/store/users-store";

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

const ButtonContainer = styled(Box)`
  margin-left: auto;
`;

const Enter = styled(Button)`
  width: 200px;
  margin-top: 20px;
`;

const NoteCreate = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const currentUserData = useSelector(getCurrentUserData());
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
        category: "67rdca3eeb7f6fgeed471818",
      })
    );
    // navigate("/");
  };
  return (
    <>
      <BackButton>
        <Button onClick={handleNavigate}>Назад</Button>
      </BackButton>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Напишите свою статью</Typography>
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
              label="Тема"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <TextField
              label="Содержание"
              id="content"
              name="content"
              value={data.content}
              onChange={handleChange}
              multiline
              rows={10}
            />
            <ButtonContainer>
              <Enter type="submit" variant="contained">
                Опубликовать
              </Enter>
            </ButtonContainer>
          </form>
        </AuthForm>
      </Component>
    </>
  );
};

export default NoteCreate;
