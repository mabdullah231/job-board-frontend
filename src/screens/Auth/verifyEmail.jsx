import React, { useState } from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(verificationCode); // Log the verification code to the console
    // Here you can add further logic, like sending the code to an API for verification
  };

  return (
    <div>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Verify Your Email</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="verify-email-area">
        <div className="container col-xl-4 py-5">
          <form onSubmit={handleSubmit} className="form-verify-email">
            <div className="form-group">
              <input
                type="text"
                name="verificationCode"
                className="form-control"
                placeholder="Enter your verification code"
                value={verificationCode}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button button-verify-email mt-2 mb-4 w-100 btn_4 boxed-btn">
              Verify Email
            </button>
            <div className="my-2">
              <p>Already verified? <Link to="/login">Log In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;