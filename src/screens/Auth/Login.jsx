import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // For redirection

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate fields
    if (!loginData.email || !loginData.password) {
      Helpers.toast("error", "Email and Password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${Helpers.apiUrl}auth/login`,
        loginData
      );

      if (response.data.code === "EMAIL_NOT_VERIFIED") {
        Helpers.toast("error", "Verify your email before logging in.");
        return;
      }

      Helpers.toast("success", "Login successful.");
      Helpers.setItem("token", response.data.token);
      Helpers.setItem("user", JSON.stringify(response.data.user));
      Helpers.refresh()
      const userType = response.data.user.user_type;
      console.log("User Type", userType);
      if (parseInt(userType) == 0) {
        console.log("Navigating To Admin");
        navigate("/admin/dashboard");
      } else if (parseInt(userType) == 1) {
        console.log("Navigating To Employer Dashboard");
        navigate("/employer/dashboard");
      } else if (parseInt(userType) == 2) {
        navigate("/");
      }
      Helpers.scrollToTop();
    } catch (error) {
      let errorMessage = "Invalid credentials.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your internet.";
      } else {
        errorMessage = error.message;
      }

      Helpers.toast("error", errorMessage);
    }
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
          <img
            src="/assets/img/logo-small.png"
            className="mb-4 d-block mx-auto"
            alt="Logo"
          />

          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
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
              />
            </div>

            <button
              type="submit"
              className="button button-login mt-2 mb-4 w-100 btn_4 boxed-btn"
            >
              Log In
            </button>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="my-2">
              <p>
                Don't Have an Account?{" "}
                <Link to="/register">
                  <span className="">Register Here</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
