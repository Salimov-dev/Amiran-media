import styled from "@emotion/styled";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Account = styled(Box)`
  display: flex;
  gap: 6px;
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
`;

const AccountLogin = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("signup");
  };
  return (
    <Account>
      <Typography>Нет аккаунта?</Typography>
      <LinkStyled onClick={handleClick}>Зарегистрироваться</LinkStyled>
    </Account>
  );
};

export default AccountLogin;
