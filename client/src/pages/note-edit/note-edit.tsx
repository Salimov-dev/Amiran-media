// libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import styled from "@emotion/styled";
import { Box, Button, Typography, Paper } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// components
import NoteEditForm from "./components/note-edit-form";
// store
import {
  getSelectedNote,
  updateNote,
} from "../../entities/note/store/notes-store";
import { getCurrentUserData } from "../../entities/user/store/users-store";
import { getCategoriesList } from "../../entities/categories/store/categories-store";
import { getSelectedNoteId } from "../../shared/redux/store/selected-note-store";

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

const NoteEdit = () => {
  const selectedNoteStorage = localStorage.getItem("selectedNoteId");
  const selectedNoteId = useSelector(getSelectedNoteId());
  const selectedNote = useSelector(getSelectedNote(selectedNoteStorage));
  const currentUserData = useSelector(getCurrentUserData());
  const categories = useSelector(getCategoriesList());
  const [data, setData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    setData({
      title: selectedNote?.title || "",
      content: selectedNote?.content || "",
      category: selectedNote?.category || "",
    });
  }, [selectedNote]);

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
      updateNote({
        ...data,
        userId: currentUserData._id,
        noteId: selectedNoteId,
      })
    );
    navigate("/");
  };

  return (
    <Box sx={{ marginTop: "75px" }}>
      <BackButton>
        <Button onClick={handleNavigate}>
          <KeyboardArrowLeftOutlinedIcon /> Отменить
        </Button>
      </BackButton>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Отредактируйте свою статью</Typography>
          </Title>
          <NoteEditForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
            categories={categories}
          />
        </AuthForm>
      </Component>
    </Box>
  );
};

export default NoteEdit;
