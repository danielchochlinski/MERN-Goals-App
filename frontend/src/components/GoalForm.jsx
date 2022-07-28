import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import "./GoalForm.scss";
const GoalForm = () => {
  const [text, setText] = useState();
  console.log(text);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    
      <div className="goal_form">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="">Goal</label>
            <input
              type="text"
              name="text"
              id="text"
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
