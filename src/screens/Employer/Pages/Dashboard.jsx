import React, { useEffect, useState } from "react";
import Helpers from "../../../Config/Helpers";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}employer/stats`, Helpers.authHeaders);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching employer stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return       <div className="d-flex justify-content-center align-items-center vh-100">
<div class="loader "></div></div>;
  }

  return (
    <div className="container py-4 min-vh-75">
      <h2 className="mb-4">Employer Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body text-center">
              <h5 className="card-title">Total Job Posts</h5>
              <h2 className="text-primary">{stats.job_post_count}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-success">
            <div className="card-body text-center">
              <h5 className="card-title">Total Applications</h5>
              <h2 className="text-success">{stats.job_application_count}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-info">
            <div className="card-body text-center">
              <h5 className="card-title">Company Name</h5>
              <h4>{stats.company.name}</h4>
              {/* <img src={`${Helpers.apiUrl}${stats.company.logo}`} alt="Company Logo" className="img-fluid mt-2" style={{ maxHeight: "80px" }} /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-warning">
            <div className="card-body text-center">
              <h5 className="card-title">Accepted Applications</h5>
              <h2 className="text-warning">{stats.application_counts.accepted}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-danger">
            <div className="card-body text-center">
              <h5 className="card-title">Rejected Applications</h5>
              <h2 className="text-danger">{stats.application_counts.rejected}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">Pending Applications</h5>
              <h2 className="text-secondary">{stats.application_counts.pending}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
