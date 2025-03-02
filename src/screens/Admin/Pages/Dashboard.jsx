import React, { useEffect, useState } from "react";
import Helpers from "../../../Config/Helpers";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}admin/stats`, Helpers.authHeaders);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
            <div className="col-md-4">
              <div className="card border-primary shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Users</h5>
                  <h2 className="text-primary">{stats.total_users}</h2>
                  {/* <p>Employers: {stats.user_types.Employer}</p> */}
                  {/* <p>Job Seekers: {stats.user_types["Job Seeker"]}</p> */}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-success shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Skills</h5>
                  <h2 className="text-success">{stats.total_skills}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-warning shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Tags</h5>
                  <h2 className="text-warning">{stats.total_tags}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="card border-info shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Categories</h5>
                  <h2 className="text-info">{stats.total_categories}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="card border-danger shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Job Posts</h5>
                  <h2 className="text-danger">{stats.total_job_posts}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="card border-dark shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Job Applications</h5>
                  <h2 className="text-dark">{stats.total_job_applications}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="card border-secondary shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Companies</h5>
                  <h2 className="text-secondary">{stats.total_companies}</h2>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
