import { Box } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const Component = styled(Box)`
  width: 350px;
  height: 100vh;
  border-right: 1px solid #cecece;
`;

const NoteElement = styled(Box)({
  padding: "20px",
  borderBottom: "1px solid #f1f1ef",
  cursor: "pointer",
  "&:hover": {
    background: "#dfdfdd",
    "& .cropContent": {
      color: "black",
    },
  },
});

const Title = styled(Box)`
  font-size: 16px;
  font-weight: bold;
`;

const SubTitle = styled(Box)`
  display: flex;
  gap: 8px;
`;

const Date = styled(Box)`
  font-weight: bold;
`;

const CropContent = styled(Box)`
  color: #cecece;
`;

interface Note {
  _id: string;
  title: string;
  created_at: string;
  notes: string;
}

const NotesList = ({ notes, onSelectNote }) => {

  const time = (date: string) => {
    return dayjs(date).format("HH:mm");
  };

  return (
    <Component>
      {notes.map((note: Note) => (
        <NoteElement key={note._id} onClick={() => onSelectNote(note._id)}>
          <Title>{note.title}</Title>
          <SubTitle>
            <Date>{time(note.created_at)}</Date>
            <CropContent className="cropContent">Начало текста...</CropContent>
          </SubTitle>
        </NoteElement>
      ))}
    </Component>
  );
};

export default NotesList;
