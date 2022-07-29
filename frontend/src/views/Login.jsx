import React, { useState, useEffect } from "react";
import Spinner from "../components/ui/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { useNotification } from "../notification_contetxt/NotificationProvider";
import { uniqueID } from "../utils/utils";
import "./NoAuth.scss";

const initialValue = { email: "", password: "" };
const Login = () => {
  const [formValues, setFormValues] = useState(initialValue);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createNot = useNotification();

  const { user, isLoading } = useSelector((state) => state.auth);

  const { email, password } = formValues;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      createNot({
        id: uniqueID(),
        title: "ERROR",
        message: "Type in your credentials",
      });
      return;
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="noAuth">
        <div className="noAuth_container">
          <h1>Login</h1>
          <div className="form_div">
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
        </div>
      </section>
    </>
  );
};

export default Login;
