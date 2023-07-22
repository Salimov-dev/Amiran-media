// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// MUI
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// components
import Comment from "../../comment/components/comment";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../user/store/users-store";
import { removeNote } from "../store/notes-store";

const Component = styled(Box)`
  width: 100%;
  padding: 20px;
`;

const Note = styled(Box)`
  width: 100%;
`;

const Time = styled(Box)`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  color: gray;
`;

const Title = styled(Box)`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled(Box)`
  display: flex;
  gap: 8px;
  padding-bottom: 20px;
`;

const Author = styled(Box)`
  display: flex;
  justify-content: end;
  padding-bottom: 20px;
  font-style: italic;
`;

const CommentTitle = styled(Typography)`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Buttons = styled(Box)`
  display: flex;
  justify-content: end;
`;

const NoteContent = ({ note, author, comments }) => {
  const [open, setOpen] = useState(false);
  const currentUserData = useSelector(getCurrentUserData());
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const filteredComments = comments?.filter(
    (comm) => comm?.noteId === note?._id
  );

  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD MMMM YYYY,HH:mm");
  };

  const handleDeleteNote = (noteId) => {
    setOpen(false);
    dispatch(removeNote(noteId));
    navigate("/")
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (noteId) => {
    setOpen(false);
  };

  return (
    <Component>
      {note ? (
        <>
          <Note>
            <Time>{time(note.createdAt)}</Time>
            <Title>{note.title}</Title>
            <Content>{note.content}</Content>

            {note.userId === currentUserData._id && (
              <>
                <Buttons>
                  <Button>Редактировать</Button>
                  <Button onClick={handleClickOpen}>Удалить</Button>

                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Удалить статью?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Восстановить её уже не получиться ни когда :-(
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Отменить
                      </Button>
                      <Button
                        onClick={() => handleDeleteNote(note._id)}
                        autoFocus
                      >
                        Подтвердить
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Buttons>
              </>
            )}

            <Author>{author?.name}</Author>
          </Note>
          <Box>
            <CommentTitle>Комментарии</CommentTitle>
            {filteredComments.length ? (
              filteredComments.map((comm) => (
                <Comment key={comm._id} comm={comm} />
              ))
            ) : (
              <Typography>
                Здесь пока ни кто не оставил ни одного комментария :-(
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <Box>Выберите статью</Box>
      )}
    </Component>
  );
};

export default NoteContent;
