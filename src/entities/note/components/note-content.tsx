// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
// MUI
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// store
import { getNoteCommentsList } from "../../../shared/redux/store/comments-store";
// components
import Comment from "../../comment/comment";

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
  -bottom: 20px;
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

const NoteContent = ({ note, author }) => {
  const filteredComments = useSelector(getNoteCommentsList(note));

  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD MMMM YYYY,HH:mm");
  };

  return (
    <Component>
      {note ? (
        <>
          <Note>
            <Time>{time(note.created_at)}</Time>
            <Title>{note.title}</Title>
            <Content>{note.content}</Content>
            <Author>{author.name}</Author>
          </Note>
          <Box>
            <CommentTitle>Комментарии</CommentTitle>
            {filteredComments.length ? (
              filteredComments?.map((comm) => (
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
