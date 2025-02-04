import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(loginData); // Log the login data to the console
    // Here you can add further logic, like sending the data to an API
  };

  return (
    <div>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Log In</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form-area">
        <div className="container col-xl-4 py-5">
            <img src="/assets/img/logo-small.png" className="mb-4 d-block mx-auto" alt="" />
          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button button-login mt-2 mb-4 w-100 btn_4 boxed-btn">
              Log In
            </button>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="my-2">
              <p>Don't Have an Account? <Link to="/register"><span className="">Register Here</span></Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;