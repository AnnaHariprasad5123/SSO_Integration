export const signUpFields = [
  { label: "Email", type: "email" },
  { label: "Password", type: "password" },
  { label: "Confirm Password", type: "password" },
];
export const signInFields = [
  { label: "Email", type: "email" },
  { label: "Password", type: "password" },
];
export const emailRegexPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const emailIsRequired = "Email is required";
export const inValidEmail = "Invalid email format";
export const API_URL = "http://localhost:7000";
