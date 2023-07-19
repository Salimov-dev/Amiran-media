// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
// MUI
import { Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const Component = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "10px",
  "&:last-child": {
    marginBottom: "0px",
  },
});

const Container = styled(Paper)`
  padding: 20px;
`;

const CommentContent = styled(Box)`
  margin-bottom: 5px;
`;

const CommentInfo = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 8px;
  padding-left: 14px;
  font-style: italic;
`;

const Comment = ({ comm }) => {
  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD.MM.YYYY в HH:mm");
  };

  return (
    <Component>
      <Container>
        <CommentContent>{comm.comment}</CommentContent>
        <CommentInfo>
          <CommentContent>
            {comm.userId}
            {/* {useSelector(getNoteAuthor(comm.userId))?.name}, */}
          </CommentContent>
          <CommentContent>{time(comm.created_at)}</CommentContent>
        </CommentInfo>
      </Container>
    </Component>
  );
};

export default Comment;
