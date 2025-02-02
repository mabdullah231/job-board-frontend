import React from "react";
import {
  HomeCategories,
  HomeCompanies,
  HomeFilterBar,
  HomeHeroSection,
  HomeListings,
  Testimonials,
  CallToAction,
} from "../components";
const Home = () => {
  return (
    <div>
      <HomeHeroSection />
      <HomeFilterBar />
      <HomeCategories />
      <HomeListings />
      <HomeCompanies />
      <CallToAction />
      <Testimonials />
    </div>
  );
};

export default Home;
