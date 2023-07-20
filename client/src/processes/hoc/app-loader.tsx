import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadNotesList } from "../../entities/note/store/notes-store";
import notes from "../../shared/mockData/notes.json";
import users from "../../shared/mockData/users.json";
import comments from "../../shared/mockData/comments.json";
import categories from "../../shared/mockData/categories.json";
import { loadUsersList } from "../../shared/redux/store/users-store";
import { loadCommentsList } from "../../shared/redux/store/comments-store";
import { loadCategoriesList } from "../../shared/redux/store/categories-store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadNotesList(notes));
    dispatch<any>(loadUsersList(users));
    dispatch<any>(loadCommentsList(comments));
    dispatch<any>(loadCategoriesList(categories));
  }, []);

  return children;
};

export default AppLoader;
