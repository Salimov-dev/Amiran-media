import ButtonsBlock from "./buttons-block";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const Component = styled(Box)`
  width: 100%;
  margin-bottom: 30px;
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

  font-size: 20px;
  font-weight: bold;
`;

const Category = styled(Box)`
  display: flex;
  gap: 8px;
  font-style: italic;
  margin-bottom: 20px;
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

const Note = ({ note, user, author, getCategoryName }) => {
  const time = (date: string) => {
    return dayjs(date).locale("ru").format("DD MMMM YYYY,HH:mm");
  };
  return (
    <Component>
      <Time>{time(note.createdAt)}</Time>
      <Title>{note.title}</Title>
      <Category>
        <Typography>Категория:</Typography>
        {getCategoryName(note.category)}
      </Category>
      <Content>{note.content}</Content>
      {note?.userId === user?._id && <ButtonsBlock note={note} />}
      <Author>{author?.name}</Author>
      <Divider />
    </Component>
  );
};

export default Note;
