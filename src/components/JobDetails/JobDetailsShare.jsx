import React from 'react';

const JobDetailsShare = () => {
  return (
    <div className="share_wrap d-flex">
      <span>Share at:</span>
      <ul>
        <li>
          <a href="#"> <i className="fa fa-facebook"></i></a>
        </li>
        <li>
          <a href="#"> <i className="fa fa-google-plus"></i></a>
        </li>
        <li>
          <a href="#"> <i className="fa fa-twitter"></i></a>
        </li>
        <li>
          <a href="#"> <i className="fa fa-envelope"></i></a>
        </li>
      </ul>
    </div>
  );
};

export default JobDetailsShare;