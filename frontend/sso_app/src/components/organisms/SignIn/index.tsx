import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import {
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Google from "../../../assets/icons/google.svg";
import Github from "../../../assets/icons/github.svg";
import OpenEye from "../../../assets/icons/openEye.svg";
import ClosedEye from "../../../assets/icons/closeEye.svg";
import { signInFields } from "../../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services";

const Container = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "fit-content",
  width: "360px",
  padding: "16px",
  gap: "16px",
  borderRadius: "4px",
  margin: "16px",
});

const LabelTextfield = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "4px",
  gap: "4px",
});

const LoginText = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const EndAdorment = ({ handleClickShowPassword, showPassword }: any) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        data-testid="visibleIcon"
        onClick={handleClickShowPassword}
        edge="end"
      >
        <img
          src={showPassword ? OpenEye : ClosedEye}
          alt={showPassword ? "VisibleIcon" : "InvisibleIcon"}
        />
      </IconButton>
    </InputAdornment>
  );
};

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmitButton = async () => {
    if (!email || !password) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      return;
    }

    if (!passwordError && !emailError) {
      try {
        await loginUser({ email, password });
        navigate("/");
        window.location.reload();
      } catch (error) {
        alert("Credientials are incorrect!");
        window.location.reload();
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" children="Welcome to Sign In" />

      <LabelTextfield>
        <Typography variant="subtitle2" children={signInFields[0].label} />
        <TextField
          placeholder={`Enter your ${signInFields[0].label}`}
          type={signInFields[0].type}
          size="small"
          value={email}
          onChange={handleEmailChange}
          error={emailError !== ""}
          helperText={emailError}
        />
      </LabelTextfield>

      <LabelTextfield>
        <Typography variant="subtitle2" children={signInFields[1].label} />
        <TextField
          placeholder={`Enter your ${signInFields[1].label}`}
          size="small"
          value={password}
          error={passwordError !== ""}
          helperText={passwordError}
          InputProps={{
            type: showPassword ? "text" : "password",
            endAdornment: (
              <EndAdorment
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
              />
            ),
          }}
          onChange={handlePasswordChange}
        />
      </LabelTextfield>

      <Button
        children="Sign In"
        variant="contained"
        disableRipple
        disableElevation
        disableFocusRipple
        sx={{ textTransform: "none" }}
        onClick={handleSubmitButton}
      />

      <Divider>Or</Divider>

      <Button
        children="Login with Google"
        variant="outlined"
        disableRipple
        disableElevation
        disableFocusRipple
        sx={{ textTransform: "none" }}
        startIcon={<img src={Google} alt="GoogleIcon" />}
        onClick={() =>
          loginWithRedirect({
            authorizationParams: { connection: "google-oauth2" },
          })
        }
      />

      <Button
        children="Login with Github"
        variant="outlined"
        disableRipple
        disableElevation
        disableFocusRipple
        sx={{ textTransform: "none" }}
        startIcon={<img src={Github} alt="GithubIcon" />}
        onClick={() =>
          loginWithRedirect({
            authorizationParams: { connection: "github" },
          })
        }
      />

      <LoginText>
        <Typography variant="subtitle2" children="Don’t have an account? " />

        <Button
          children="Signup"
          variant="text"
          disableRipple
          disableElevation
          disableFocusRipple
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/signup")}
        />
      </LoginText>
    </Container>
  );
};
