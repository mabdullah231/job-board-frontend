import React, { useState, useEffect } from "react";
import {
  HomeCategories,
  HomeCompanies,
  HomeFilterBar,
  HomeHeroSection,
  HomeListings,
  Testimonials,
  CallToAction,
} from "../components";
import axios from "axios";
import Helpers from "../Config/Helpers";

const Home = () => {
  const [cities, setCities] = useState();
  const [categories, setCategories] = useState();
  const [companies, setCompanies] = useState();
  const [jobPosts, setJobPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, categoriesRes, companiesRes, jobPostsRes] = await Promise.all([
          axios.get(`${Helpers.apiUrl}data/city/all`),
          axios.get(`${Helpers.apiUrl}data/category/all`),
          axios.get(`${Helpers.apiUrl}data/companies/all`),
          axios.get(`${Helpers.apiUrl}data/jobpost/all`),
        ]);

        setCities(citiesRes.data);
        setCategories(categoriesRes.data);
        setCompanies(companiesRes.data);
        setJobPosts(jobPostsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // console.log("jobs",jobPosts);
  }, []);

  return (
    <div>
      <HomeHeroSection />
      <HomeFilterBar cities={cities} categories={categories} />
      <HomeCategories categories={categories} />
      <HomeListings jobListings={jobPosts}/>
      <HomeCompanies companies={companies}/>
      <CallToAction />
      <Testimonials />
    </div>
  );
};

export default Home;
