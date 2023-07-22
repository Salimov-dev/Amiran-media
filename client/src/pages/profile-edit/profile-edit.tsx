// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Box, Button, Paper } from "@mui/material";
import styled from "@emotion/styled";
// store
import {
  getCurrentUserData,
  updateUser,
} from "../../entities/user/store/users-store";
import ProfileEditForm from "./components/profile-edit-form";
import { useForm } from "react-hook-form";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileContainer = styled(Paper)`
  display: flex;
  width: 300px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled(`img`)({
  width: "200px",
  borderRadius: "10px",
  margin: "20px 0 20px 0px",
});

const BackButton = styled(Box)`
  padding: 20px 0 0 20px;
`;

const ProfileEdit = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [data, setData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
    navigate(-1);
  };

  useEffect(() => {
    setData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
    });
  }, [currentUser]);

  return (
    <>
      <BackButton>
        <Button onClick={handleNavigate}>Назад</Button>
      </BackButton>
      <Component>
        <ProfileContainer>
          <Avatar src={currentUser?.image} />
          <ProfileEditForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </ProfileContainer>
      </Component>
    </>
  );
};

export default ProfileEdit;
