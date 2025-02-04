import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(registerData); // Log the registration data to the console
    // Here you can add further logic, like sending the data to an API
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
          <img src="/assets/img/logo-small.png" className="mb-4 d-block mx-auto" alt="" />
          <form onSubmit={handleSubmit} className="form-register">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={registerData.name}
                onChange={handleChange}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button button-register mt-2 mb-4 w-100 btn_4 boxed-btn">
              Register
            </button>
            <div className="login-link">
              <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;