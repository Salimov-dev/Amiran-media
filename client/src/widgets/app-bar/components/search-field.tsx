import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const TextFieldContainer = styled.div`
  position: relative;
  min-width: 200px; /* Set your desired minimum width here */
`;

const SearchField = ({data, setData}) => {
    
  return (
    <TextFieldContainer>
      <TextField
        id="search"
        label="Найти статью"
        variant="outlined"
        size="small"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      {data && (
        <InputAdornment position="end">
          <ClearOutlinedIcon
            sx={{
              color: "gray",
              width: "20px",
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px",
            }}
            onClick={() => setData("")}
          />
        </InputAdornment>
      )}
    </TextFieldContainer>
  );
};

export default SearchField;
