import React from 'react';

const JobDetailsForm = () => {
  return (
    <div className="apply_job_form white-bg">
      <h4>Apply for the job</h4>
      <form action="#">
        <div className="row">
          <div className="col-md-6">
            <div className="input_field">
              <input type="text" placeholder="Your name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_field">
              <input type="text" placeholder="Email" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input_field">
              <input type="text" placeholder="Website/Portfolio link" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="button" id="inputGroupFileAddon03">
                  <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                </button>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile03"
                  aria-describedby="inputGroupFileAddon03"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile03">
                  Upload CV
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input_field">
              <textarea
                name="#"
                id=""
                cols="30"
                rows="10"
                placeholder="Cover letter"
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="submit_btn">
              <button className="boxed-btn3 w-100" type="submit">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;