import axios from "axios";

const API_URL = "api/users/";

//register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    console.log(response);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
