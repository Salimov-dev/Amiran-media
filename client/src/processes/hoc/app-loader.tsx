import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadNotesList } from "../../entities/note/store/notes-store";
import notes from "../../shared/mockData/notes.json";
import users from "../../shared/mockData/users.json";
import comments from "../../shared/mockData/comments.json";
import categories from "../../shared/mockData/categories.json";
import { loadUsersList } from "../../entities/user/components/users-store";
import { loadCommentsList } from "../../entities/comment/store/comments-store";
import { loadCategoriesList } from "../../entities/categories/store/categories-store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadNotesList());
    dispatch<any>(loadUsersList(users));
    dispatch<any>(loadCommentsList());
    dispatch<any>(loadCategoriesList());
  }, []);

  return children;
};

export default AppLoader;
