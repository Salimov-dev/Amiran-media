// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
// MUI
import { Box, Paper, Divider } from "@mui/material";
import styled from "@emotion/styled";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// store
import { getNoteAuthor } from "../../user/store/users-store";
import { useSelector } from "react-redux";

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
  display: flex;
  align-items: center;
`;

const CommentInfo = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 8px;
  padding-left: 14px;
  margin-top: 6px;
  font-style: italic;
`;

const AuthorInfo = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled(`img`)({
  width: "30px",
  borderRadius: "50%",
  marginRight: "10px",
});

const Comment = ({ comm, user, onRemoveComment }) => {
  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD.MM.YYYY в HH:mm");
  };

  const isCurrenAuthor = comm?.userId === user?._id;

  return (
    <Component>
      <Container>
        <AuthorInfo>
          {isCurrenAuthor && (
            <ClearOutlinedIcon
            onClick={()=>onRemoveComment(comm._id)}
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
              }}
            />
          )}
          <Avatar src={useSelector(getNoteAuthor(comm.userId))?.image} />
          <CommentContent>{comm.comment}</CommentContent>
        </AuthorInfo>
        <Divider />
        <CommentInfo>
          <CommentContent>
            {useSelector(getNoteAuthor(comm.userId))?.name},
          </CommentContent>
          <CommentContent>{time(comm.created_at)}</CommentContent>
        </CommentInfo>
      </Container>
    </Component>
  );
};

export default Comment;
