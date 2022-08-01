import axios from "axios";

const BASE_URL = "https://goal-set-app.herokuapp.com/api/goals/";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(BASE_URL, goalData, config);

  return response.data;
};

//Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL, config);

  return response.data;
};

//delete goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(BASE_URL + goalId, config);

  return response.data;
};

const updateGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(BASE_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal
};

export default goalService;
