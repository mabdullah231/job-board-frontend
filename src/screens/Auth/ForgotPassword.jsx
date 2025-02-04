import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setVerificationCode(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Handle form submission based on the current step
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      console.log(email); // Log the email to the console
      // Here you can add logic to send the email for verification
      setStep(2); // Move to the next step
    } else if (step === 2) {
      console.log(verificationCode); // Log the verification code to the console
      // Here you can add logic to verify the code
      setStep(3); // Move to the next step
    } else if (step === 3) {
      console.log(newPassword, confirmPassword); // Log the new password and confirm password
      // Here you can add logic to reset the password
    }
  };

  return (
    <div>
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Forgot Password</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="forgot-password-area">
        <div className="container col-xl-4 py-5">
          <form onSubmit={handleSubmit} className="form-forgot-password">
            {step === 1 && (
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button type="submit" className="button button-next mt-2 mb-4 w-100 btn_4 boxed-btn">
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="form-group">
                <input
                  type="text"
                  name="verificationCode"
                  className="form-control"
                  placeholder="Enter your verification code"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  required
                />
                <button type="submit" className="button button-next mt-2 mb-4 w-100 btn_4 boxed-btn">
                  Verify Code
                </button>
              </div>
            )}
            {step === 3 && (
              <>
                <div className="form-group">
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="button button-reset-password mt-2 mb-4 w-100 btn_4 boxed-btn">
                  Reset Password
                </button>
              </>
            )}
            <div className="my-2">
              <p>Remembered your password? <Link to="/login">Log In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;