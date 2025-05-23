import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./screens/Layout";
import AdminLayout from "./screens/Admin/AdminLayout";
import Helpers from "./Config/Helpers";
import { Home, Jobs, Contact, JobDetails, Login, Register, Profile, ForgotPassword } from "./screens";
import {
  AdminDashboard,
  AdminCities,
  AdminCategories,
  AdminSkills,
  AdminTags,
  AdminUsers,
} from "./screens/Admin/Pages";
import EmployerLayout from "./screens/Employer/EmployerLayout";
import {
  Company,
  EmployerDashboard,
  JobApplications,
  JobPosts,
} from "./screens/Employer/Pages";
import Loader from "./components/Common/Loader";
Loader

const Auth = ({ children, isAuth = true, allowedRoles = [] }) => {
  let user = Helpers.getItem("user", true); // Get stored user
  let token = Helpers.getItem("token"); // Get stored token

  // If the route requires authentication
  if (isAuth) {
    if (!user || !token) {
      Helpers.toast("error", "Please login to continue");
      return <Navigate to="/login" />;
    }

    // Check if user has permission to access the route
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(parseInt(user.user_type))
    ) {
      Helpers.toast("error", "Access denied.");

      // Redirect based on user role
      switch (parseInt(user.user_type)) {
        case 0:
          return <Navigate to="/admin/dashboard" />;
        case 1:
          return <Navigate to="/employer/dashboard" />;
        case 2:
          return <Navigate to="/" />;
        default:
          return <Navigate to="/login" />;
      }
    }

    return children; // User is authenticated and has access
  }

  // For public routes
  else {
    if (user && token) {
      switch (parseInt(user.user_type)) {
        case 0:
          return <Navigate to="/admin/dashboard" />;
        case 1:
          return <Navigate to="/employer/dashboard" />;
      }
    }
    return children;
  }
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          <Route
            path="/login"
            element={
              <Auth isAuth={false}>
                <Login />
              </Auth>
            }
          />
          <Route
            path="/profile"
            element={
              <Auth isAuth={true}>
                <Profile/>
              </Auth>
            }
          />
          <Route
            path="/register"
            element={
              <Auth isAuth={false}>
                <Register />
              </Auth>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Auth isAuth={false}>
                <ForgotPassword />
              </Auth>
            }
          />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <Auth allowedRoles={[0]}>
                <AdminDashboard />
              </Auth>
            }
          />
          <Route
            path="cities"
            element={
              <Auth allowedRoles={[0]}>
                <AdminCities />
              </Auth>
            }
          />
          <Route
            path="categories"
            element={
              <Auth allowedRoles={[0]}>
                <AdminCategories />
              </Auth>
            }
          />
          <Route
            path="skills"
            element={
              <Auth allowedRoles={[0]}>
                <AdminSkills />
              </Auth>
            }
          />
          <Route
            path="tags"
            element={
              <Auth allowedRoles={[0]}>
                <AdminTags />
              </Auth>
            }
          />
          <Route
            path="users"
            element={
              <Auth allowedRoles={[0]}>
                <AdminUsers />
              </Auth>
            }
          />
        </Route>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route
            path="dashboard"
            element={
              <Auth allowedRoles={[1]}>
                <EmployerDashboard />
              </Auth>
            }
          />
          <Route
            path="company"
            element={
              <Auth allowedRoles={[1]}>
                <Company />
              </Auth>
            }
          />
          <Route
            path="job_applications"
            element={
              <Auth allowedRoles={[1]}>
                <JobApplications />
              </Auth>
            }
          />
          <Route
            path="job_posts"
            element={
              <Auth allowedRoles={[1]}>
                <JobPosts />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
