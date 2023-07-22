// libraries
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useMemo } from "react";
// MUI
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// store
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../categories/store/categories-store";
import { getIsLoadingNotesList } from "../store/notes-store";
import { getSearchQuery } from "../../../shared/redux/store/search-query-store";
// components
import Loader from "../../../widgets/loader";

const Component = styled(Box)`
  width: 350px;
  position: fixed;
  top: 71px;
  direction: rtl; /* Add the semicolon here */
  background-color: #f9f9f7;
  border-right: 1px solid #cecece;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  max-height: calc(100vh - 70px);
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 100vw;
  }
`;

const NoteElement = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  padding: "20px",
  borderBottom: "1px solid #f1f1ef",
  cursor: "pointer",
  "&:hover": {
    background: "#c4c4c4",
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
  flex-direction: row-reverse;
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

const LoaderContainer = styled(Box)`
  margin: auto;
`;

const EmptyResult = styled(Box)`
  margin: auto;
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
  const isLoading = useSelector(getIsLoadingNotesList());
  const searchQuery = useSelector(getSearchQuery());

  const searchedNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, notes]);

  const isEmptyResult = Boolean(searchedNotes.length);

  const getCategoryName = (id) => {
    return categories?.find((cat) => cat?._id === id)?.name;
  };

  const time = (date: string) => {
    const currentDate = dayjs();
    const noteDate = dayjs(date);

    if (noteDate.isSame(currentDate, "day")) {
      return noteDate.format("HH:mm");
    } else {
      return noteDate.locale("ru").format("DD.MM.YYYY");
    }
  };

  return (
    <Component>
      {!isLoading ? (
        isEmptyResult ? (
          searchedNotes?.map((note: Note) => (
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
          ))
        ) : (
          <EmptyResult>
            <Typography>Ни одной статьи не найдено</Typography>
          </EmptyResult>
        )
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </Component>
  );
};

export default NotesList;
