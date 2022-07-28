import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/ui/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import "./Dashboard.scss";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user]);
  return (
    <section className="dashboard_container">
      <div>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </div>
      <div>
        <GoalForm />
      </div>
      <div className="goal_list">
        {goals.length > 0 ? (
          <div>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>Set some goals</h3>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
