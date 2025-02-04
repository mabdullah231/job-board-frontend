import React from 'react';

const JobDetailsSummary = () => {
  return (
    <div className="job_sumary">
      <div className="summery_header">
        <h3>Job Summary</h3>
      </div>
      <div className="job_content">
        <ul>
          <li>Published on: <span>12 Nov, 2019</span></li>
          <li>Vacancy: <span>2 Position</span></li>
          <li>Salary: <span>50k - 120k/y</span></li>
          <li>Location: <span>California, USA</span></li>
          <li>Job Nature: <span>Full-time</span></li>
        </ul>
      </div>
    </div>
  );
};

export default JobDetailsSummary;