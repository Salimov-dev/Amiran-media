// MUI
import styled from "@emotion/styled";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const ButtonContainer = styled(Box)`
  margin-left: auto;
`;

const Enter = styled(Button)`
  width: 200px;
  margin-top: 20px;
`;

const NoteEditForm = ({ data, onSubmit, onChange, categories }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        padding: "20px",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Тема"
        id="title"
        name="title"
        value={data.title}
        onChange={onChange}
      />
      <TextField
        label="Содержание"
        id="content"
        name="content"
        value={data.content}
        onChange={onChange}
        multiline
        rows={10}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Категория</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="category"
          label="Категория"
          name="category"
          value={data.category}
          onChange={onChange}
        >
          {categories.map((categ) => (
            <MenuItem key={categ._id} value={categ._id}>
              {categ.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ButtonContainer>
        <Enter type="submit" variant="contained">
          Сохранить
        </Enter>
      </ButtonContainer>
    </form>
  );
};

export default NoteEditForm;
