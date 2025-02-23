import React from "react";
import Select from "react-select"; 
const HomeFilterBar = ({cities, categories}) => {

  const cityOptions = cities ? cities.map((city) => ({ value: city.id, label: city.city })) : null;
  const categoryOptions = categories ? categories.map((category) => ({ value: category.id, label: category.name })): null;
  // console.log(cityOptions);
  // console.log(categoryOptions);
  return (
    <div className="catagory_area">
      <div className="container">
        <div className="row cat_search">
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <input type="text" placeholder="Search keyword" />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <Select options={cityOptions} placeholder="Select Location" isClearable />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-lg-3 col-md-4">
            <div className="single_input">
              <Select options={categoryOptions} placeholder="Select Category" isClearable />
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="job_btn">
              <a href="#" className="boxed-btn3">
                Find Job
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="popular_search d-flex align-items-center">
              <span>Popular Search:</span>
              <ul>
                <li>
                  <a href="#">Design & Creative</a>
                </li>
                <li>
                  <a href="#">Marketing</a>
                </li>
                <li>
                  <a href="#">Administration</a>
                </li>
                <li>
                  <a href="#">Teaching & Education</a>
                </li>
                <li>
                  <a href="#">Engineering</a>
                </li>
                <li>
                  <a href="#">Software & Web</a>
                </li>
                <li>
                  <a href="#">Telemarketing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilterBar;
