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
import { emailRegexPattern, inValidEmail } from "../../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services";

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

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    if (email !== "" && !emailRegexPattern.test(email)) {
      setEmailError(inValidEmail);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (password !== "" && !/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain at least one number");
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setPasswordError("Password must contain at least one special character");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (password.length < 8) {
      setPasswordError("Password must contain at least 8 digits");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== "") {
      validateEmail(value);
    }
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value !== "") {
      validatePassword(value);
    }
    setPassword(value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value !== "") {
      validateConfirmPassword(value);
    }
    setConfirmPassword(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmitButton = () => {
    if (!email || !password || !confirmPassword) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      if (!confirmPassword)
        setConfirmPasswordError("Confirm Password is required");
      return;
    } else if (
      password === confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setConfirmPasswordError("");
      createUser({ email, password });
      navigate("/");
    }
  };

  return (
    <Container>
      <Typography variant="h6" children="Welcome to Sign Up" />

      <LabelTextfield>
        <Typography variant="subtitle2" children="Email" />
        <TextField
          placeholder="Enter your Email"
          type="email"
          size="small"
          onChange={handleEmailChange}
          value={email}
          error={emailError !== ""}
          helperText={emailError}
        />
      </LabelTextfield>

      <LabelTextfield>
        <Typography variant="subtitle2" children="Password" />
        <TextField
          placeholder="Enter your Password"
          variant="outlined"
          size="small"
          value={password}
          onChange={handlePasswordChange}
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
        />
      </LabelTextfield>

      <LabelTextfield>
        <Typography variant="subtitle2" children="Confirm Password" />
        <TextField
          placeholder="Confirm your Password"
          variant="outlined"
          size="small"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError !== ""}
          helperText={confirmPasswordError}
          InputProps={{
            type: showConfirmPassword ? "text" : "password",
            endAdornment: (
              <EndAdorment
                handleClickShowPassword={handleClickShowConfirmPassword}
                showPassword={showConfirmPassword}
              />
            ),
          }}
        />
      </LabelTextfield>

      <Button
        children="Sign up"
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
        <Typography variant="subtitle2" children="Already have an account? " />

        <Button
          children="Login"
          variant="text"
          disableRipple
          disableElevation
          disableFocusRipple
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/")}
        />
      </LoginText>
    </Container>
  );
};
