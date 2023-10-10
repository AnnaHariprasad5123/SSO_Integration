import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Typography, styled } from "@mui/material";

interface ProfileProps {
  picture?: string;
  name?: string;
  email?: string;
}

const Container = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "fit-content",
  width: "fit-content",
  padding: "16px",
  gap: "16px",
  borderRadius: "4px",
  margin: "16px",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  top: "50%",
  left: "50%",
});

const HomePage = ({ picture, name, email }: ProfileProps) => {
  const { logout } = useAuth0();

  const logOut = () => {
    localStorage.removeItem("token");
    logout();
  };
  return (
    <Container>
      <Typography variant="h6" children="Welcome to Homepage" />

      <img
        src={
          picture ??
          "https://miro.medium.com/v2/resize:fit:920/1*8_H6bhApuPNI7QQEbDByzg.png"
        }
        alt={name ?? "Hi Jwt User"}
      />
      <Typography variant="subtitle1" children={name} />
      <Typography variant="subtitle1" children={email} />
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={logOut}
      >
        Log Out
      </Button>
    </Container>
  );
};

export default HomePage;
