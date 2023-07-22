// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Typography, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
// components
import Comment from "../../comment/components/comment";
// store
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../user/store/users-store";
import Note from "./components/note";
import { createComment } from "../../comment/store/comments-store";

const Component = styled(Box)`
  width: 100%;
  padding: 20px;
`;

const CommentTitle = styled(Typography)`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const CreateNewComment = styled(Box)`
  width: 40%;
`;

const CommentField = styled(TextField)`
  width: 100%;
  background-color: white;
`;

const NoteContent = ({ note, author, comments }) => {
  const [data, setData] = useState("");
  const currentUserData = useSelector(getCurrentUserData());
  const dispatch = useDispatch();

  const filteredComments = comments?.filter(
    (comm) => comm?.noteId === note?._id
  );

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      comment: data,
      userId: currentUserData._id,
      noteId: note._id,
    };

    dispatch(createComment(newComment));

    setData("");
  };

  return (
    <Component>
      {note ? (
        <>
          <Note note={note} author={author} user={currentUserData} />
          <>
            <CommentTitle>Комментарии</CommentTitle>

            <CreateNewComment>
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  marginBottom: "30px",
                }}
              >
                <CommentField
                  label="Комментарий"
                  id="title"
                  name="title"
                  value={data}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
                <Button type="submit" disabled={!data.length}>
                  Опубликовать
                </Button>
              </form>
            </CreateNewComment>

            {filteredComments.length ? (
              filteredComments.map((comm) => (
                <Comment key={comm._id} comm={comm} />
              ))
            ) : (
              <Typography>
                Здесь пока ни кто не оставил ни одного комментария :-(
              </Typography>
            )}
          </>
        </>
      ) : (
        <Box>Выберите статью</Box>
      )}
    </Component>
  );
};

export default NoteContent;
