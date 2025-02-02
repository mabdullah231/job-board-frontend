import SingleListing from "../Common/SingleListing";

const HomeListings = () => {
    const jobListings = [
        { title: "Software Engineer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/1.svg" },
        { title: "Digital Marketer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/2.svg" },
        { title: "Wordpress Developer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/3.svg" },
        { title: "Visual Designer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/4.svg" },
        { title: "Creative Designer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/5.svg" },
        { title: "Software Engineer", location: "California, USA", jobType: "Part-time", dateLine: "31 Jan 2020", imagePath: "assets/img/svg_icon/1.svg" },
    ];

    return (
        <div className="job_listing_area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="section_title">
                            <h3>Job Listing</h3>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="brouse_job text-right">
                            <a href="jobs.html" className="boxed-btn4">Browse More Job</a>
                        </div>
                    </div>
                </div>
                <div className="job_lists">
                    <div className="row">
                        {jobListings.map((job, index) => (
                            <div className="col-lg-12 col-md-12" key={index}>
                                <SingleListing 
                                    title={job.title} 
                                    location={job.location} 
                                    jobType={job.jobType} 
                                    dateLine={job.dateLine} 
                                    imagePath={job.imagePath} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeListings;