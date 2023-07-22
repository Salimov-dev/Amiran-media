import { Box } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../categories/store/categories-store";

const Component = styled(Box)`
  width: 350px;
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

const Category = styled(Box)`
  font-style: italic;
`;

const Date = styled(Box)`
  font-weight: bold;
`;

const CropContent = styled(Box)`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Note {
  _id: string;
  title: string;
  created_at: string;
  notes: string;
  content: string;
}

const NotesList = ({ notes, onSelectNote, selectedNoteID }) => {
  const categories = useSelector(getCategoriesList());
  
  const getCategoryName = (id) => {
    return categories?.find((cat) => cat?._id === id)?.name;
  };

  const time = (date: string) => {
    return dayjs(date).format("HH:mm");
  };

  return (
    <Component>
      {notes?.map((note: Note) => (
        <NoteElement
          key={note._id}
          onClick={() => onSelectNote(note._id)}
          sx={{
            backgroundColor:
              note._id === selectedNoteID ? "#dfdfdd" : "inherit",
            color: note._id === selectedNoteID ? "black" : "inherit",
          }}
        >
          <Title>{note.title}</Title>
          <SubTitle>
            <Date>{time(note.created_at)}</Date>
            <CropContent
              className="cropContent"
              sx={{
                color: note._id === selectedNoteID ? "black" : "#cecece",
              }}
            >
              {note.content}
            </CropContent>
          </SubTitle>
          <Category>{getCategoryName(note.category)}</Category>
        </NoteElement>
      ))}
    </Component>
  );
};

export default NotesList;
