import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    userType: null, // Ensure it's null for select
  });

  const handleChange = (e) => {
    if (e && e.value) {
      // Handling react-select dropdown
      setRegisterData({
        ...registerData,
        userType: e.value, // Store only value
      });
    } else {
      // Handling normal inputs
      const { name, value } = e.target;
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    }
  };

  const roleOptions = [
    { value: "1", label: "Job Poster" },
    { value: "2", label: "Job Seeker" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validation
    if (!registerData.name) return Helpers.toast("error", "Name is required.");
    if (!registerData.email)
      return Helpers.toast("error", "Email is required.");
    if (!registerData.password)
      return Helpers.toast("error", "Password is required.");
    if (!registerData.password_confirmation)
      return Helpers.toast("error", "Password confirmation is required.");
    if (registerData.password !== registerData.password_confirmation)
      return Helpers.toast("error", "Passwords do not match.");
    if (!registerData.userType)
      return Helpers.toast("error", "User type is required.");

    try {
      const response = await axios.post(
        `${Helpers.apiUrl}auth/register`,
        registerData
      );
      console.log(response);
      Helpers.toast("success", "Registration successful! Login Please");
      navigate("/login");
      // Handle successful registration (e.g., redirect)
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check your internet connection.";
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
                <h3>Register</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="register-form-area">
        <div className="container col-xl-4 py-5">
          <img
            src="/assets/img/logo-small.png"
            className="mb-4 d-block mx-auto"
            alt=""
          />
          <form onSubmit={handleSubmit} className="form-register">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={registerData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={registerData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password_confirmation"
                className="form-control"
                placeholder="Confirm your password"
                value={registerData.password_confirmation}
                onChange={handleChange}
              />
            </div>
            <div className="form-select" id="default-select">
              <Select
                name="userType"
                className="form-select"
                value={roleOptions.find(
                  (option) => option.value === registerData.userType
                )}
                onChange={handleChange}
                options={roleOptions}
                placeholder="Select Role"
              />
            </div>
            <button
              type="submit"
              className="button button-register mt-2 mb-4 w-100 btn_4 boxed-btn"
            >
              Register
            </button>
            <div className="login-link">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
