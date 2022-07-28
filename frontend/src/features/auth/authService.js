import axios from "axios";
import { useNotification } from "../../notification_contetxt/NotificationProvider";
import { uniqueID } from "../../utils/utils";

const API_URL = "http://localhost:5000/api/users/";
const createNotification = useNotification;
//register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  createNotification({
    id: uniqueID(),
    title: "SUCCESS",
    message: "succes",
  });
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
