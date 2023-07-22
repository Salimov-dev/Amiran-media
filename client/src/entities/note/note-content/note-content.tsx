// libraries
import { useState } from "react";
// MUI
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// store
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../user/store/users-store";
import Note from "./components/note";
import {
  createComment,
  getCommentsList,
  removeComment,
} from "../../comment/store/comments-store";
import CommentsBlock from "./components/comments-block";
import { getCategoriesList } from "../../categories/store/categories-store";

const Component = styled(Box)`
  width: 100%;
  padding: 20px;
  margin-left: 350px;
  margin-top: 75px;
`;

const NoteContent = ({ note, author }) => {
  const comments = useSelector(getCommentsList());
  const [data, setData] = useState("");
  const currentUserData = useSelector(getCurrentUserData());
  const dispatch = useDispatch();

  const categories = useSelector(getCategoriesList());
  const getCategoryName = (id) => {
    return categories?.find((cat) => cat?._id === id)?.name;
  };

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

  const handleRemoveComment = (commId) => {
    dispatch(removeComment(commId));
  };

  return (
    <Component>
      {note ? (
        <>
          <Note note={note} author={author} user={currentUserData} getCategoryName={getCategoryName} />
          {currentUserData && (
            <CommentsBlock
              data={data}
              onRemoveComment={handleRemoveComment}
              onSubmit={handleSubmit}
              comments={filteredComments}
              user={currentUserData}
              onChange={handleChange}
            />
          )}
        </>
      ) : (
        <Box>Выберите статью</Box>
      )}
    </Component>
  );
};

export default NoteContent;
