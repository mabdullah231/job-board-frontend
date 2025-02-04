import React, { useState } from "react";
import Pagination from "../Common/Pagination";
import SingleListing from "../Common/SingleListing";
import ListingSelect from "../Common/ListingSelect";

const JobListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      location: "California, USA",
      jobType: "Part-time",
      dateLine: "31 Jan 2020",
      imagePath: "assets/img/svg_icon/1.svg",
    },
    {
      id: 2,
      title: "Digital Marketer",
      location: "California, USA",
      jobType: "Part-time",
      dateLine: "31 Jan 2020",
      imagePath: "assets/img/svg_icon/2.svg",
    },
    {
      id: 3,
      title: "Wordpress Developer",
      location: "New York, USA",
      jobType: "Full-time",
      dateLine: "31 Jan 2020",
      imagePath: "assets/img/svg_icon/3.svg",
    },
    {
      id: 4,
      title: "Visual Designer",
      location: "California, USA",
      jobType: "Part-time",
      dateLine: "31 Jan 2020",
      imagePath: "assets/img/svg_icon/4.svg",
    },
    {
      id: 5,
      title: "Creative Designer",
      location: "Texas, USA",
      jobType: "Full-time",
      dateLine: "31 Jan 2020",
      imagePath: "assets/img/svg_icon/5.svg",
    },
    // Add more jobs as needed
  ];

  // State for filters
  const [filters, setFilters] = useState({
    searchKeyword: "",
    location: "",
    category: "",
    experience: "",
    jobType: "",
    qualification: "",
    gender: "",
  });

  const locationOptions = [
    { value: "California, USA", label: "California, USA" },
    { value: "New York, USA", label: "New York, USA" },
    { value: "Texas, USA", label: "Texas, USA" },
  ];

  const categoryOptions = [
    { value: "Category 1", label: "Category 1" },
    { value: "Category 2", label: "Category 2" },
  ];

  const experienceOptions = [
    { value: "Experience 1", label: "Experience 1" },
    { value: "Experience 2", label: "Experience 2" },
  ];

  const jobTypeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
  ];

  const qualificationOptions = [
    { value: "Qualification 1", label: "Qualification 1" },
    { value: "Qualification 2", label: "Qualification 2" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleFilterChange = (selectedItem, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedItem ? selectedItem.value : "", // Get the value from the selected item
    }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const filteredJobs = jobs.filter((job) => {
    return (
        job.title.toLowerCase().includes(filters.searchKeyword ? filters.searchKeyword.toLowerCase() : '') &&
      (filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.jobType === "" ||
        job.jobType.toLowerCase() === filters.jobType.toLowerCase()) &&
      (filters.category === "" || job.category === filters.category) && // Assuming job.category exists
      (filters.experience === "" || job.experience === filters.experience) && // Assuming job.experience exists
      (filters.qualification === "" ||
        job.qualification === filters.qualification) && // Assuming job.qualification exists
      (filters.gender === "" || job.gender === filters.gender) // Assuming job.gender exists
    );
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchKeyword: "",
      location: "",
      category: "",
      experience: "",
      jobType: "",
      qualification: "",
      gender: "",
    });
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
                        <input
                          type="text"
                          placeholder="Search keyword"
                          name="searchKeyword"
                          value={filters.searchKeyword}
                          onChange={(e) =>
                            handleFilterChange(e.target, "searchKeyword")
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Location"
                        name="location"
                        value={filters.location}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "location")
                        }
                        options={locationOptions}
                        placeholder="Location"
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Category"
                        name="category"
                        value={filters.category}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "category")
                        }
                        options={categoryOptions}
                        placeholder="Category"
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Experience"
                        name="experience"
                        value={filters.experience}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "experience")
                        }
                        options={experienceOptions}
                        placeholder="Experience"
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Job Type"
                        name="jobType"
                        value={filters.jobType}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "jobType")
                        }
                        options={jobTypeOptions}
                        placeholder="Job type"
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Qualification"
                        name="qualification"
                        value={filters.qualification}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "qualification")
                        }
                        options={qualificationOptions}
                        placeholder="Qualification"
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Gender"
                        name="gender"
                        value={filters.gender}
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "gender")
                        }
                        options={genderOptions}
                        placeholder="Gender"
                      />
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
                      color: "#7a838b",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  />
                </p>
              </div>
              <div className="reset_btn">
                <button
                  className="boxed-btn3 w-100"
                  type="button"
                  onClick={resetFilters}
                >
                  Reset
                </button>
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
