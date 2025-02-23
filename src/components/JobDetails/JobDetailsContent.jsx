import React from 'react';
import Helpers from '../../Config/Helpers';
const JobDetailsContent = ({ job }) => {
  if (!job) return <p>Loading job details...</p>;

  return (
    <>
      <div className="job_details_header">
        <div className="single_jobs white-bg d-flex justify-content-between">
          <div className="jobs_left d-flex align-items-center">
            <div className="thumb">
            <img
            src={Helpers.serverImage(job.company.logo)}
            alt={job.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "", // Ensures the image fills the space without distortion
              // borderRadius: "5px", // Optional: adds rounded corners for a better look
            }}
          />
            </div>
            <div className="jobs_conetent">
              <a href="#"><h4>{job.title}</h4></a>
              <div className="links_locat d-flex align-items-center">
                <div className="location">
                  <p><i className="fa fa-map-marker"></i> {job.city?.city || "Unknown"}</p>
                </div>
                <div className="location">
                  <p><i className="fa fa-clock-o"></i> {job.job_type}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="jobs_right">
            <div className="apply_now">
              <a className="heart_mark" href="#">
                <i className="ti-heart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="descript_wrap white-bg">
        <div className="single_wrap">
          <h4>Job Description</h4>
          <p>{job.description || "No description available."}</p>
        </div>

        <div className="single_wrap">
          <h4>Skills Required</h4>
          <ul>
            {job.skills && job.skills.length > 0 ? (
              job.skills.map(skill => <li key={skill.id}>{skill.name}</li>)
            ) : (
              <li>No specific skills required.</li>
            )}
          </ul>
        </div>

        <div className="single_wrap">
          <h4>Company</h4>
          <p>{job.company?.name || "No company details available."}</p>
        </div>

        <div className="single_wrap">
          <h4>Category</h4>
          <p>{job.category?.name || "Uncategorized"}</p>
        </div>

      </div>
    </>
  );
};

export default JobDetailsContent;
