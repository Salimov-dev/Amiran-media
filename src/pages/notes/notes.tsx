import { useSelector } from "react-redux";
import { getNotesList } from "../../shared/redux/store/notes-store";
import { getusersList } from "../../shared/redux/store/users-store";
import { getCommentsList } from "../../shared/redux/store/comments-store";
import { getCategoriesList } from "../../shared/redux/store/categories-store";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuIcon,
} from "@mui/material";

import styled from "@emotion/styled";

const Notes = () => {
  const notes = useSelector(getNotesList());
  const users = useSelector(getusersList());
  const comments = useSelector(getCommentsList());
  const categories = useSelector(getCategoriesList());
  //   console.log("notes", notes);
  //   console.log("users", users);
  //   console.log("comments", comments);
  //   console.log("categories", categories);

  return <h1>notes</h1>;
};

export default Notes;
