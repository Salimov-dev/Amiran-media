// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
// MUI
import { Box, Paper, Divider } from "@mui/material";
import styled from "@emotion/styled";
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ClearIcon from "@mui/icons-material/Clear"
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
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled(`img`)({
  width: "30px",
  borderRadius: "50%",
  marginRight: "10px",
});

const Comment = ({ comm }) => {
  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD.MM.YYYY в HH:mm");
  };

  return (
    <Component>
      <Container>
        <AuthorInfo>
          {/* <img src={ClearOutlinedIcon} alt="" /> */}
          {/* <ClearOutlinedIcon/> */}
          <ClearIcon/>
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
