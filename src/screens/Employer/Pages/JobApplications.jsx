import React, { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "../../../Config/Helpers";

const JobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all job applications for employer
  const fetchJobApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}employer/jobapplication/all`,
        Helpers.getAuthHeaders()
      );
      setJobApplications(response.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Applications</h2>
      {jobApplications.length === 0 ? (
        <p className="text-muted">No applications found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Applicant</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.user?.name || "N/A"}</td>
                  <td>{app.job?.title || "N/A"}</td>
                  <td>{app.status || "Pending"}</td>
                  <td>
                    <button
                      className="btn btn-primary text-white btn-sm"
                      onClick={() => {
                        setSelectedApplication(app);
                        setShowModal(true);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedApplication && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Application Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Applicant:</strong> {selectedApplication.user?.name}</p>
                <p><strong>Email:</strong> {selectedApplication.user?.email}</p>
                <p><strong>Job Title:</strong> {selectedApplication.job?.title}</p>
                <p><strong>Cover Letter:</strong> {selectedApplication.cover_letter || "N/A"}</p>

                {selectedApplication.file && (
                  <div className="mt-3">
                    <h5>Attached File:</h5>
                    <button
                      className="btn btn-link"
                      onClick={() => handleDownload(selectedApplication.file.file_path)}
                    >
                      {selectedApplication.file.file_path.split("/").pop()}
                    </button>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedApplication.status === "pending" && (
                  <>
                    <button
                      className="btn btn-success text-white"
                      onClick={() => updateApplicationStatus(selectedApplication.id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger text-white"
                      onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default JobApplications;
