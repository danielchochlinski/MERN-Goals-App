import React, { useState, useEffects } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../features/auth/authService";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;
  console.log(name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     //useContext for notification
  //   }
  //   if (isSuccess || user) {
  //     navigate("/");
  //     dispatch(reset());
  //   }


  //   if (isLoading) {
  //   }
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

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
    if (password !== password2) {
      //dispatch error message from notification context later
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
  return (
    <>
      <section>
        <h1>Register</h1>
        <p>Create an account</p>
      </section>
      <section>
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
      </section>
    </>
  );
};

export default Register;
