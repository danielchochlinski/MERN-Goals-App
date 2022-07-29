import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { useNotification } from "../notification_contetxt/NotificationProvider";
import { uniqueID } from "../utils/utils";
import "./GoalItem.scss";

const GoalItem = ({ goal }) => {
  const createNot = useNotification();
  const deleteHandler = () => {
    createNot({
      id: uniqueID(),
      type: "SUCCESS",
      message: "Goal deleted.",
    });
    dispatch(deleteGoal(goal._id));
  };
  const dispatch = useDispatch();
  return (
    <div className="goal_item">
      <div>
        <h2>{goal.text}</h2>
      </div>
      <div className="goal_info">
        <div>
          <p>{new Date(goal.createdAt).toLocaleString("en-UK")}</p>
        </div>
        <div></div>
        <button onClick={deleteHandler}>X</button>
      </div>
    </div>
  );
};

export default GoalItem;
