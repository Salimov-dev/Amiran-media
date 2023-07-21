// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
// MUI
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// components
import Comment from "../../comment/components/comment";

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

const NoteContent = ({ note, author, comments }) => {
 
  const filteredComments = comments?.filter((comm) => comm?.noteId === note?._id);

  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD MMMM YYYY,HH:mm");
  };

  return (
    <Component>
      {note ? (
        <>
          <Note>
            <Time>{time(note.createdAt)}</Time>
            <Title>{note.title}</Title>
            <Content>{note.content}</Content>
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
