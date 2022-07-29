import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { goals } = useSelector((state) => state.goals);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user]);

  let name = user?.name;
  if (name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <section className="dashboard_container">
      <div style={{ textAlign: "left", margin: "0 0 1rem 0" }}>
        <p>Goals Dashboard</p>
        <h1>Welcome {name}</h1>
      </div>

      <div>
        <GoalForm />
      </div>
      <div>
        <div className="goal_list">
          {goals.length > 0 ? (
            <span>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </span>
          ) : (
            <h3>Set some goals</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
