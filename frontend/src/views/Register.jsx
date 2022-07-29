import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/ui/Spinner";

import "./NoAuth.scss";
import { useNotification } from "../notification_contetxt/NotificationProvider";
import { uniqueID } from "../utils/utils";
const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;
  const createNot = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [isError, navigate, user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      createNot({
        id: uniqueID(),
        type: "ERROR",
        message: "Passwords dont match",
      });
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="noAuth">
        <div className="noAuth_container">
          <h1>Register</h1>
          <p>Create an account</p>
          <div className="form_div">
            <div>
              <form onSubmit={onSubmit}>
                <div>
                  <input
                    type="text"
                    className="form_control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="form_control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form_control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form_control"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm your password"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
