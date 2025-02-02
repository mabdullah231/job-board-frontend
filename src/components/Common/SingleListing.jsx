
const SingleListing = ({ title, location, jobType, dateLine, imagePath }) => {
    return (
        <div className="single_jobs white-bg d-flex justify-content-between">
            <div className="jobs_left d-flex align-items-center">
                <div className="thumb">
                    <img src={imagePath} alt={title} />
                </div>
                <div className="jobs_conetent">
                    <a href="job_details.html"><h4>{title}</h4></a>
                    <div className="links_locat d-flex align-items-center">
                        <div className="location">
                            <p><i className="fa fa-map-marker"></i> {location}</p>
                        </div>
                        <div className="location">
                            <p><i className="fa fa-clock-o"></i> {jobType}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jobs_right">
                <div className="apply_now">
                    <a className="heart_mark" href="#">
                        <i className="ti-heart"></i>
                    </a>
                    <a href="job_details.html" className="boxed-btn3">Apply Now</a>
                </div>
                <div className="date">
                    <p>Date line: {dateLine}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleListing;