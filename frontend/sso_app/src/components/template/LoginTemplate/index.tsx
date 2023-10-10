import React from "react";
import { Grid, styled } from "@mui/material";

const TemplateContainer = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const LeftContainer = styled(TemplateContainer)({
  "@media (max-width: 960px)": {
    display: "none",
  },
});

interface SignInTemplateProps {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const LoginTemplate = ({
  leftComponent,
  rightComponent,
}: SignInTemplateProps) => {
  return (
    <Grid container>
      <LeftContainer item xs={6} md={6}>
        {leftComponent ?? "Left Side Component"}
      </LeftContainer>
      <TemplateContainer item xs={12} md={6}>
        {rightComponent ?? "Right Side Component"}
      </TemplateContainer>
    </Grid>
  );
};

export default LoginTemplate;
