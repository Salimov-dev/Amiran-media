import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";

const Buttons = styled(Box)`
  display: flex;
  justify-content: end;
`;

const ButtonsBlock = ({note}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleDeleteNote = (noteId) => {
        setOpen(false);
        dispatch(removeNote(noteId));
        navigate("/");
      };
    
      const handleEditNote = () => {
        navigate(`/note/${note._id}/edit`);
      };
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (noteId) => {
        setOpen(false);
      };
  return (
    <>
      <Buttons>
        <Button onClick={handleEditNote}>Редактировать</Button>
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
            <Button onClick={() => handleDeleteNote(note._id)} autoFocus>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>
      </Buttons>
    </>
  );
};

export default ButtonsBlock;
