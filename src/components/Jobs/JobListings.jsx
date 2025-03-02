import React, { useEffect, useState } from "react";
import Pagination from "../Common/Pagination";
import SingleListing from "../Common/SingleListing";
import ListingSelect from "../Common/ListingSelect";
import Helpers from "../../Config/Helpers";
import Loader from "../Common/Loader";

const JobListings = ({ categories, cities, jobPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [loading, setLoading] = useState(false);

  const locationOptions = cities.map((city) => ({
    value: city.city,
    label: city.city,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const jobTypeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Remote", label: "Remote" },
  ];

  const [filters, setFilters] = useState({
    searchKeyword: "",
    location: "",
    category: "",
    jobType: "",
  });

  const handleFilterChange = (selectedItem, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedItem ? selectedItem.value : "",
    }));
    setCurrentPage(1);
  };

  const filteredJobs = jobPosts.filter((job) => {
    return (
      job.title.toLowerCase().includes(filters.searchKeyword.toLowerCase()) &&
      (filters.location === "" || job.city.city.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.jobType === "" || job.job_type.toLowerCase() === filters.jobType.toLowerCase()) &&
      (filters.category === "" || job.category.name.toLowerCase().includes(filters.category.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const resetFilters = () => {
    setFilters({
      searchKeyword: "",
      location: "",
      category: "",
      jobType: "",
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
                        value={
                          filters.location
                            ? locationOptions.find(
                                (option) => option.value === filters.location
                              )
                            : null
                        }
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "location")
                        }
                        options={locationOptions}
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Category"
                        name="category"
                        value={
                          filters.category
                            ? categoryOptions.find(
                                (option) => option.value === filters.category
                              )
                            : null
                        }
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "category")
                        }
                        options={categoryOptions}
                      />
                    </div>
                    <div className="col-lg-12">
                      <ListingSelect
                        label="Job Type"
                        name="jobType"
                        value={
                          filters.jobType
                            ? jobTypeOptions.find(
                                (option) => option.value === filters.jobType
                              )
                            : null
                        }
                        onChange={(selectedItem) =>
                          handleFilterChange(selectedItem, "jobType")
                        }
                        options={jobTypeOptions}
                      />
                    </div>
                  </div>
                </form>
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
                  <div className="col-md-6 py-2">
                    <h4>Job Listing</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="job_lists m-0">
              <div className="row">
                {currentJobs.map((job) => (
                  <div className="col-lg-12 col-md-12" key={job.id}>
                    <SingleListing
                      id={job.id}
                      title={job.title}
                      location={job.city.city}
                      jobType={job.job_type}
                      dateLine={job.deadline}
                      imagePath={Helpers.serverFile(job.company.logo)}
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