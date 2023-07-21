import { Box, Button, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData } from "../../entities/user/store/users-store";

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

const Info = styled(Box)`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: start;
`;

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const Avatar = styled(`img`)({
  width: "200px",
  borderRadius: "10px",
  margin: "20px 0 80px 0px",
});

const BackButton = styled(Box)`
  padding: 20px 0 0 20px;
`;

const Profile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(`/user/${currentUser._id}/edit`);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <BackButton>
        <Button onClick={handleNavigate}>Вернуться к статьям</Button>
      </BackButton>
      <Component>
        <ProfileContainer>
          <Avatar src={currentUser?.image} />
          <Info>
            <Typography fontWeight={700}>Имя: </Typography> {currentUser?.name}
          </Info>
          <Info>
            <Typography fontWeight={700}>E-mail: </Typography>{" "}
            {currentUser?.email}
          </Info>
          <ButtonStyled type="submit" onClick={handleEditProfile}>Редактировать</ButtonStyled>
        </ProfileContainer>
      </Component>
    </>
  );
};

export default Profile;
