import { Link } from "react-router-dom";

const SingleListing = ({ title, location, jobType, dateLine, imagePath, id }) => {
  // console.log(title, location, jobType, dateLine, imagePath);
  return (
    <div className="single_jobs white-bg d-flex justify-content-between">
      <div className="jobs_left d-flex align-items-center">
        <div className="thumb">
          <img
            src={imagePath}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "", // Ensures the image fills the space without distortion
              // borderRadius: "5px", // Optional: adds rounded corners for a better look
            }}
          />
        </div>
        <div className="jobs_conetent">
          <Link to={`jobdetails/${id}`}>
            <h4>{title}</h4>
          </Link>
          <div className="links_locat d-flex align-items-center">
            <div className="location">
              <p>
                <i className="fa fa-map-marker"></i> {location}
              </p>
            </div>
            <div className="location">
              <p>
                <i className="fa fa-clock-o"></i> {jobType}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="jobs_right">
        <div className="apply_now">
          <a className="heart_mark" href="#">
            <i className="ti-heart"></i>
          </a>
          <Link to={`/jobdetails/${id}`} className="boxed-btn3">
            Apply Now
          </Link>
        </div>
        <div className="date">
          <p>Date line: {dateLine}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
