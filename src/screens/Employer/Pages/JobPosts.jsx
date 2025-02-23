import React, { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "../../../Config/Helpers";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const JobPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "Full-time",
    salary: "",
    deadline: "",
    category_id: "",
    city_id: "",
    tags: [],
    skills: [],
  });
  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}employer/jobpost/all`,
        Helpers.getAuthHeaders()
      );
      setJobPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}data/city/all`,
        Helpers.getAuthHeaders()
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}data/category/all`,
        Helpers.getAuthHeaders()
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}data/tags/all`,
        Helpers.getAuthHeaders()
      );
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching Tags:", error);
    }
  };
  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}data/skills/all`,
        Helpers.getAuthHeaders()
      );
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching Skills:", error);
    }
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowForm(true);

    // Map category_id and city_id to { value, label } format
    const selectedCategory = categories.find(
      (cat) => cat.id === job.category_id
    );
    const selectedCity = cities.find((city) => city.id === job.city_id);

    const selectedTags = job.tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));
    const selectedSkills = job.skills.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }));

    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      job_type: job.job_type,
      salary: job.salary,
      deadline: job.deadline,
      category_id: selectedCategory ? selectedCategory.id : "", // Store the ID
      city_id: selectedCity ? selectedCity.id : "", // Store the ID
      tags: selectedTags, // Store the array of { value, label } objects
      skills: selectedSkills, // Store the array of { value, label } objects
    });
  };

  useEffect(() => {
    fetchJobPosts();
  }, []);

  useEffect(() => {
    if (showForm) {
      fetchCategories();
      fetchCities();
      fetchTags();
      fetchSkills();
    }
  }, [showForm]);

  useEffect(() => {
    console.log(formData);
    // console.log(cities);
    // console.log(categories);
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleMultiSelectChange = (selectedOptions, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const validateForm = () => {
    const {
      title,
      description,
      location,
      salary,
      deadline,
      category_id,
      city_id,
      tags,
      skills
    } = formData;

    if (!title) {
      Helpers.toast("error", "Job title is required.");
      return false;
    }
    if (!description) {
      Helpers.toast("error", "Job description is required.");
      return false;
    }
    if (!location) {
      Helpers.toast("error", "Location is required.");
      return false;
    }
    if (!salary || isNaN(salary) || salary <= 0) {
      Helpers.toast("error", "Salary must be a positive number.");
      return false;
    }
    if (!deadline) {
      Helpers.toast("error", "Deadline is required.");
      return false;
    }
    if (!category_id) {
      Helpers.toast("error", "Category is required.");
      return false;
    }
    if (!city_id) {
      Helpers.toast("error", "City is required.");
      return false;
    }

    if (!tags || tags.length === 0) {
      Helpers.toast("error", "At least one tag is required.");
      return false;
    }
    if (!skills || skills.length === 0) {
      Helpers.toast("error", "At least one tag is required.");
      return false;
    }

    return true;
  };
  // const handleAddEditJob = async () => {
  //   if (!validateForm()) {
  //     return; // Stop if validation fails
  //   }
  //   try {
  //     const apiUrl = `${Helpers.apiUrl}employer/jobpost/manage`;
  //     const method = selectedJob ? axios.put : axios.post;
  //     const payload = {
  //       ...formData,
  //       category_id: formData.category_id, // Already storing as value
  //       city_id: formData.city_id, // Already storing as value
  //       tags: formData.tags, // Already mapped to an array of values
  //     };
  //     await method(apiUrl, payload, Helpers.getAuthHeaders());
  //     Helpers.toast(
  //       "success",
  //       selectedJob ? "Job updated successfully" : "Job added successfully"
  //     );
  //     fetchJobPosts();
  //     setShowForm(false);
  //     setSelectedJob(null);
  //     setFormData({
  //       title: "",
  //       description: "",
  //       location: "",
  //       job_type: "Full-time",
  //       salary: "",
  //       deadline: "",
  //       category_id: "",
  //       city_id: "",
  //       tags: [],
  //     });
  //   } catch (error) {
  //     console.error("Error saving job post:", error);
  //   }
  // };

  const handleAddEditJob = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    try {
      const apiUrl = `${Helpers.apiUrl}employer/jobpost/manage`;
      const method = selectedJob ? axios.post : axios.post;
      const payload = {
        ...formData,
        category_id: formData.category_id, // Already an ID
        city_id: formData.city_id, // Already an ID
        tags: formData.tags.map((tag) => tag.value), // Extract tag IDs from { value, label } objects
        skills: formData.skills.map((skill) => skill.value), // Extract tag IDs from { value, label } objects
      };
      if (selectedJob) {
        payload.id = selectedJob.id; // Add the job ID to the payload
      }
      await method(apiUrl, payload, Helpers.getAuthHeaders());
      Helpers.toast(
        "success",
        selectedJob ? "Job updated successfully" : "Job added successfully"
      );
      setShowForm(false);
      setSelectedJob(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        job_type: "Full-time",
        salary: "",
        deadline: "",
        category_id: "",
        city_id: "",
        tags: [],
        skills: [],
      });
      fetchJobPosts();
    } catch (error) {
      console.error("Error saving job post:", error);
    }
  };

  return (
    <div className="container mt-3">
      {showForm ? (
        <div>
          <h3>{selectedJob ? "Edit Job Post" : "Add Job Post"}</h3>
          <div className="row mt-4">
            <div className="col-lg-6 mb-2">
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Job Title"
              />
            </div>
            <div className="col-lg-6 mb-2">
              <select
                className="form-control"
                name="job_type"
                value={formData.job_type}
                onChange={handleInputChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="col-12 mb-2">
              <textarea
                className="form-control"
                style={{ height: "auto" }}
                name="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Description"
                rows={4}
              ></textarea>
            </div>

            <div className="col-lg-12 mb-2">
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location / Address"
              />
            </div>
            <div className="col-lg-6 mb-2">
              <Select
                name="category_id"
                value={
                  formData.category_id
                    ? {
                        value: formData.category_id,
                        label: categories.find(
                          (cat) => cat.id === formData.category_id
                        )?.name,
                      }
                    : null
                } // Ensure it returns null if not found
                onChange={handleSelectChange}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                placeholder="Select Category"
              />
            </div>
            <div className="col-lg-6 mb-2">
            <Select
    name="city_id"
    value={
        formData.city_id
            ? { value: formData.city_id, label: cities.find((city) => city.id === formData.city_id)?.city }
            : null // Ensure it returns null if not found
    }
    onChange={handleSelectChange}
    options={cities.map((city) => ({
        value: city.id,
        label: city.city,
    }))}
    placeholder="Select City"
/>
            </div>
            <div className="col-lg-6 mb-2">
              {/* <Select
                isMulti
                name="tags"
                options={tags.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    tags: selectedOptions.map((option) => option.value),
                  })
                }
                placeholder="Select Tags"
              /> */}
              <Select
                isMulti
                name="tags"
                value={formData.tags} // This should already be in { value, label } format
                options={tags.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    tags: selectedOptions || [], // Store the selected options directly
                  })
                }
                placeholder="Select Tags"
              />
            </div>
            <div className="col-lg-6 mb-2">
              {/* <Select
                isMulti
                name="tags"
                options={tags.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    tags: selectedOptions.map((option) => option.value),
                  })
                }
                placeholder="Select Tags"
              /> */}
              <Select
                isMulti
                name="skills"
                value={formData.skills} // This should already be in { value, label } format
                options={skills.map((skill) => ({
                  value: skill.id,
                  label: skill.name,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    skills: selectedOptions || [], // Store the selected options directly
                  })
                }
                placeholder="Select Skills"
              />
            </div>
            <div className="col-lg-6 mb-2">
              <input
                type="number"
                className="form-control"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Salary"
              />
            </div>
            <div className="col-lg-6 mb-2">
              <input
                type="date"
                className="form-control"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2 mt-2 text-white"
            onClick={handleAddEditJob}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h1>Job Posts</h1>
            <button
              className="btn btn-primary text-white"
              onClick={() => setShowForm(true)}
            >
              Add Job
            </button>
          </div>
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobPosts.map((job) => (
                <tr key={job.id}>
                  <td className="w-25">{job.title}</td>
                  <td className="w-25">{job.location}</td>
                  <td>{job.job_type}</td>
                  <td>{job.salary}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default JobPosts;
