import { Box, Typography, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Comment from "../../../comment/components/comment";

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

const CommentsBlock = ({
  data,
  user,
  comments,
  onSubmit,
  onChange,
  onRemoveComment,
}) => {
  return (
    <>
      <CommentTitle>Комментарии</CommentTitle>

      <CreateNewComment>
        <form
          onSubmit={onSubmit}
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
            onChange={onChange}
            multiline
            rows={2}
          />
          <Button type="submit" disabled={!data.length}>
            Опубликовать
          </Button>
        </form>
      </CreateNewComment>

      {comments?.length ? (
        comments?.map((comm) => (
          <Comment
            key={comm._id}
            comm={comm}
            user={user}
            onRemoveComment={onRemoveComment}
          />
        ))
      ) : (
        <Typography>
          Здесь пока ни кто не оставил ни одного комментария :-(
        </Typography>
      )}
    </>
  );
};

export default CommentsBlock;
