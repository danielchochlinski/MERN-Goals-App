import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { useNotification } from "../notification_contetxt/NotificationProvider";
import { uniqueID } from "../utils/utils";
import "./GoalForm.scss";
const GoalForm = () => {
  const [text, setText] = useState("");

  const createNot = useNotification();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      createNot({
        id: uniqueID(),
        type: "ERROR",
        message: "Please type your goal",
      });
      return;
    } else {
      createNot({
        id: uniqueID(),
        type: "SUCCESS",
        message: "Goal created!",
      });
      dispatch(createGoal({ text }));
      setText("");
    }
  };
  return (
    <div className="goal_form">
      <form onSubmit={onSubmit}>
        <div>
          {/* <label htmlFor="">Goal</label> */}
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Set your goal"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add Goal</button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
