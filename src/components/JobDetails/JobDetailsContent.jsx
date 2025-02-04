import React from 'react';

const JobDetailsContent = () => {
  return (
    <>
    <div class="job_details_header">
    <div class="single_jobs white-bg d-flex justify-content-between">
      <div class="jobs_left d-flex align-items-center">
        <div class="thumb">
          <img src="assets/img/svg_icon/1.svg" alt="" />
        </div>
        <div class="jobs_conetent">
          <a href="#"><h4>Software Engineer</h4></a>
          <div class="links_locat d-flex align-items-center">
            <div class="location">
              <p><i class="fa fa-map-marker"></i> California, USA</p>
            </div>
            <div class="location">
              <p><i class="fa fa-clock-o"></i> Part-time</p>
            </div>
          </div>
        </div>
      </div>
      <div class="jobs_right">
        <div class="apply_now">
          <a class="heart_mark" href="#">
            <i class="ti-heart"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
    <div className="descript_wrap white-bg">
      <div className="single_wrap">
        <h4>Job Description</h4>
        <p>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.
        </p>
        <p>
          Variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.
        </p>
      </div>
      <div className="single_wrap">
        <h4>Responsibility</h4>
        <ul>
          <li>The applicants should have experience in the following areas.</li>
          <li>Have sound knowledge of commercial activities.</li>
          <li>Leadership, analytical, and problem-solving abilities.</li>
          <li>Should have vast knowledge in IAS/ IFRS, Company Act, Income Tax, VAT.</li>
        </ul>
      </div>
      <div className="single_wrap">
        <h4>Qualifications</h4>
        <ul>
          <li>The applicants should have experience in the following areas.</li>
          <li>Have sound knowledge of commercial activities.</li>
          <li>Leadership, analytical, and problem-solving abilities.</li>
          <li>Should have vast knowledge in IAS/ IFRS, Company Act, Income Tax, VAT.</li>
        </ul>
      </div>
      <div className="single_wrap">
        <h4>Benefits</h4>
        <p>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.
        </p>
      </div>
    </div>
    </>
  );
};

export default JobDetailsContent;