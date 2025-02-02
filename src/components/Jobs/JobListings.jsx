import React, { useState } from 'react';

import Pagination from '../Common/Pagination';
import SingleListing from '../Common/SingleListing';
const JobListings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    // Sample job data
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer',
            location: 'California, USA',
            jobType: 'Part-time',
            dateLine: '31 Jan 2020',
            imagePath: 'assets/img/svg_icon/1.svg',
        },
        {
            id: 2,
            title: 'Digital Marketer',
            location: 'California, USA',
            jobType: 'Part-time',
            dateLine: '31 Jan 2020',
            imagePath: 'assets/img/svg_icon/2.svg',
        },
        {
            id: 3,
            title: 'Wordpress Developer',
            location: 'California, USA',
            jobType: 'Part-time',
            dateLine: '31 Jan 2020',
            imagePath: 'assets/img/svg_icon/3.svg',
        },
        {
            id: 4,
            title: 'Visual Designer',
            location: 'California, USA',
            jobType: 'Part-time',
            dateLine: '31 Jan 2020',
            imagePath: 'assets/img/svg_icon/4.svg',
        },
        {
            id: 5,
            title: 'Creative Designer',
            location: 'California, USA',
            jobType: 'Part-time',
            dateLine: '31 Jan 2020',
            imagePath: 'assets/img/svg_icon/5.svg',
        },
        // Add more jobs as needed
    ];

    // Calculate the total number of pages
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    // Get current jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="job_listing_area plus_padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="job_filter white-bg">
                            <div className="form_inner white-bg">
                                <h3>Filter</h3>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <input type="text" placeholder="Search keyword" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Location">Location</option>
                                                    <option value="1">Rangpur</option>
                                                    <option value="2">Dhaka</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Category">Category</option>
                                                    <option value="1">Category 1</option>
                                                    <option value="2">Category 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Experience">Experience</option>
                                                    <option value="1">Experience 1</option>
                                                    <option value="2">Experience 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Job type">Job type</option>
                                                    <option value="1">full time 1</option>
                                                    <option value="2">part time 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Qualification">Qualification</option>
                                                    <option value="1">Qualification 1</option>
                                                    <option value="2">Qualification 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="single_field">
                                                <select className="wide">
                                                    <option data-display="Gender">Gender</option>
                                                    <option value="1">male</option>
                                                    <option value="2">female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="range_wrap">
                                <label htmlFor="amount">Price range:</label>
                                <div id="slider-range"></div>
                                <p>
                                    <input
                                        type="text"
                                        id="amount"
                                        readOnly
                                        style={{
                                            border: 0,
                                            color: '#7a838b',
                                            fontSize: '14px',
                                            fontWeight: 400,
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="reset_btn">
                                <button className="boxed-btn3 w-100" type="submit">Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="recent_joblist_wrap">
                            <div className="recent_joblist white-bg">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h4>Job Listing</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="serch_cat d-flex justify-content-end">
                                            <select>
                                                <option data-display="Most Recent">Most Recent</option>
                                                <option value="1">Marketer</option>
                                                <option value="2">Wordpress</option>
                                                <option value="4">Designer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="job_lists m-0">
                            <div className="row">
                                {currentJobs.map((job) => (
                                    <div className="col-lg-12 col-md-12" key={job.id}>
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListings;