import React, { useEffect, useState } from "react";
import { JobsHeroSection, JobListings } from "../components";
import axios from "axios";
import Helpers from "../Config/Helpers";
import Loader from "../components/Common/Loader";


const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, categoriesRes, jobPostsRes] = await Promise.all([
          axios.get(`${Helpers.apiUrl}data/city/all`),
          axios.get(`${Helpers.apiUrl}data/category/all`),
          axios.get(`${Helpers.apiUrl}data/jobpost/all`),
        ]);

        setCities(citiesRes.data);
        setCategories(categoriesRes.data);
        setJobPosts(jobPostsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <JobsHeroSection />
      <JobListings
        categories={categories}
        cities={cities}
        jobPosts={jobPosts}
      />
    </div>
  );
};

export default Jobs;