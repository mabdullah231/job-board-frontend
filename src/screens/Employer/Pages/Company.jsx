import React, { useState, useEffect } from "react";
import axios from "axios";
import Helpers from "../../../Config/Helpers";

const Company = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    logo: "",
  });

  const fetchCompany = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}employer/company/get`,
        Helpers.getAuthHeaders()
      );
      setCompany(response.data);
    } catch (err) {
      setError("Failed to fetch company details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    try {
      await axios.post(
        `${Helpers.apiUrl}employer/company/manage`,
        formDataToSend,
        Helpers.getAuthFileHeaders()
      );
      Helpers.toast(
        "success",
        company
          ? "Company updated successfully"
          : "Company created successfully"
      );
      setShowForm(false);
      fetchCompany();
    } catch (err) {
      setError("Failed to save company");
      Helpers.toast("error", "Failed to save company");
    }
  };

  const handleEdit = () => {
    setFormData({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: "",
    });
    setShowForm(true);
  };

  return (
    <div className="container mt-2">
      {!showForm && (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          {company ? (
            <>
              <h3 className="mb-2">Company Details</h3>
              <div className="card mb-4 col-lg-9 mt-2">
                <div className="card-body px-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text">
                      <h4 className="card-title">
                        Company Name: {company.name}
                      </h4>
                      <p className="card-text">
                        Description: {company.description}
                      </p>
                      <button
                        className="btn app-btn-primary "
                        onClick={handleEdit}
                      >
                        Edit Company
                      </button>
                    </div>
                    <div className="image">
                      {company.logo && (
                        <img
                          src={`${Helpers.serverImage(company.logo)}`}
                          alt={company.name}
                          className="img-fluid mb-3"
                          style={{ width: "250px", height: "250px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p>No company created yet.</p>
              <button
                className="btn btn-primary text-white"
                onClick={() => setShowForm(true)}
              >
                Create Company
              </button>
            </div>
          )}
        </>
      )}
      {showForm && (
        <div className="mt-4">
          <h3>{company ? "Edit Company" : "Create Company"}</h3>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="logo" className=" form-label">
                Logo
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary text-white">
              {company ? "Update Company" : "Create Company"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setShowForm(false)}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Company;
