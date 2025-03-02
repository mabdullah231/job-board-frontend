import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";

const JobDetailsForm = ({ jobId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!Helpers.authUser) {
      navigate("/login");
      return;
    }
  
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("cover_letter", formData.coverLetter);
      data.append("job_id", jobId);
      if (formData.file) {
        data.append("attachment", formData.file);
      }
  
      const response = await axios.post(
        `${Helpers.apiUrl}jobapplication/manage`,
        data,
        Helpers.getAuthFileHeaders()
      );
  
      if (response.status === 201) {
        Helpers.toast("success", "Application Submitted Successfully");
        setFormData({ name: "", email: "", coverLetter: "", file: null });
      } else {
        Helpers.toast("error", "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
  
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 400 && data.error === "You have already applied for this job") {
          Helpers.toast("error", "You have already applied for this job.");
        } else if (status === 422) {
          Helpers.toast("error", "Validation error. Please check your input.");
        } else {
          Helpers.toast("error", "Failed to submit application. Please try again later.");
        }
      } else {
        Helpers.toast("error", "Network error. Please check your connection.");
      }
    }
  };
  
  console.log(Helpers.authUser.id);
  return (
    <div className="apply_job_form white-bg">
      <h4>Apply for the job</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="input_field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input_field">
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                cols="30"
                rows="5"
                placeholder="Cover letter"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="button" id="inputGroupFileAddon03">
                  <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                </button>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile03"
                  onChange={handleFileChange}
                  aria-describedby="inputGroupFileAddon03"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile03">
                  {formData.file ? formData.file.name : "Upload CV"}
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="submit_btn">
              <button
                className="boxed-btn3 w-100"
                type={Helpers.authUser.id ? "submit" : "button"}
                onClick={() => {
                  if (!Helpers.authUser.id) navigate("/login");
                }}
              >
                {Helpers.authUser.id != null ? "Apply Now" : "Login First"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;
