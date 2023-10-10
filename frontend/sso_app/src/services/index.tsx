import axios from "axios";
import { API_URL } from "../utils/constants";

const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/auth/signup`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/auth/login`, {
      email: email,
      password: password,
    });
    localStorage.setItem("token", response.data.token.token);
    return response.data.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const validateUser = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/users/auth/validate?token=${token}`
    );
    return response.data;
  } catch (error) {
    console.error("Error validating user:", error);
    throw error;
  }
};

export { getUserById, createUser, loginUser, validateUser };
