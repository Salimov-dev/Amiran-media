import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadNotesList } from "../../entities/note/store/notes-store";
import users from "../../shared/mockData/users.json";
import { loadUsersList } from "../../entities/user/store/users-store";
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
