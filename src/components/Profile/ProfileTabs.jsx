// src/components/ProfileTabs.js
import React, { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import axios from "axios";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const getUserJobs = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}jobapplication/profile/all`, Helpers.authHeaders);
      setApplications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  useEffect(() => {
    getUserJobs();
    // Get user details from local storage
    const user = Helpers.authUser ; // Assuming this returns the user object
    setUserDetails(user);
  }, []);

  const handleShowModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const renderApplicationsTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Job Title</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.job.title}</td>
                  <td>{application.status}</td>
                  <td>{new Date(application.created_at).toLocaleDateString()}</td>
                  <td>
                    <button style={{ backgroundColor: "#00D363" }} className="btn text-white btn-sm" onClick={() => handleShowModal(application)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProfileDetails = () => {
    if (!userDetails) {
      return <p>Loading user details...</p>;
    }

    return (
      <div>
        <h5>Name: {userDetails.name}</h5>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>User Type:</strong> {userDetails.user_type}</p>
        <p><strong>Code:</strong> {userDetails.code}</p>
        <p><strong>Account Status:</strong> {userDetails.is_active ? "Active" : "Inactive"}</p>
        <p><strong>Created At:</strong> {new Date(userDetails.created_at).toLocaleDateString()}</p>
        <p><strong>Email Verified At:</strong> {userDetails.email_verified_at ? new Date(userDetails.email_verified_at).toLocaleDateString() : "Not Verified"}</p>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
            style={{ cursor: "pointer" }}
          >
            Your Applications
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
            style={{ cursor: "pointer" }}
          >
            Profile Details
          </a>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {activeTab === "applications" ? renderApplicationsTable() : renderProfileDetails()}
      </div>

      {showModal && selectedApplication && (
        <div className="modal fade show animate__animated animate__fadeIn border" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content border border-secondary">
              <div className="modal-header">
                <h5 className="modal-title">Application Details</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>Job Title: {selectedApplication.job.title}</h5>
                <p><strong>Company:</strong> {selectedApplication.job.company.name}</p>
                <p><strong>Cover Letter:</strong> {selectedApplication.cover_letter}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
                <p><strong>Applied On:</strong> {new Date(selectedApplication.created_at).toLocaleDateString()}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;