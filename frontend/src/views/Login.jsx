import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import authService from "../features/auth/authService";
import { login, reset } from "../features/auth/authSlice";
import "./NoAuth.scss";
import { useNotification } from "../notification_contetxt/NotificationProvider";
import { uniqueID } from "../utils/utils";
const createNotification = useNotification;
const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  console.log(isError);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  console.log(formValues);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  let yes = true;
  if (yes) {
    createNotification({
      id: uniqueID(),
      type: "ERROR",
      message: "ups something went wrong please try again",
    });
  }
  if (isError) {
    createNotification({
      id: uniqueID(),
      type: "ERROR",
      message: "ups something went wrong please try again",
    });
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="noAuth">
        <div className="form_div">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        {/* <Spinner /> */}
      </section>
    </>
  );
};

export default Login;
