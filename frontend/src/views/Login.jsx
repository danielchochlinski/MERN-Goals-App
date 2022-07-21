import React, { useState, useEffects } from "react";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  console.log(formValues);

  const onSubmit = () => {};
  return (
    <>
      <section>
        <h1>Login</h1>
      `</section>
      <section>
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
      </section>
    </>
  );
};

export default Login;
