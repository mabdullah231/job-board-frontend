import React from 'react';

const JobDetailsSummary = ({ job }) => {
  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="job_sumary">
      <div className="summery_header">
        <h3>Job Summary</h3>
      </div>
      <div className="job_content">
        <ul>
          <li>Published on: <span>{new Date(job.created_at).toLocaleDateString()}</span></li>
          <li>Salary: <span>${job.salary}</span></li>
          <li>City: <span>{job.city.city}</span></li>
          <li>Address: <span>{job.location}</span></li>
          <li>Job Type: <span>{job.job_type}</span></li>
        </ul>
        {job.tags && job.tags.length > 0 && (
          <div className="mt-3">
            <h5 className="fw-semibold">Tags:</h5>
            <div className="d-flex flex-wrap">
              {job.tags.map((tag) => (
                <span key={tag.id} style={{backgroundColor:"#00D363"}}className="badge  text-white mr-2 px-3 py-2">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsSummary;
