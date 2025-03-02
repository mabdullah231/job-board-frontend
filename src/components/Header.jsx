import { Link, useNavigate } from "react-router-dom";
import Helpers from "../Config/Helpers";
import axios from "axios";

const Header = () => {
  const user = Helpers.getItem("user", true); // Get stored user object
  const token = Helpers.getItem("token"); // Get stored token
  const userRole = user ? parseInt(user.user_type) : null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${Helpers.apiUrl}logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Helpers.toast("success", "Logged out successfully!");
        Helpers.removeItem("user");
        Helpers.removeItem("token");
        Helpers.refresh()
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      let errorMessage = "Logout failed. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your internet.";
      } else {
        errorMessage = error.message;
      }

      Helpers.toast("error", errorMessage);
    }
  };

  return (
    <div>
      <header>
        <div className="header-area">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                      <Link to="/">
                        <img src="/assets/img/logo.png" alt="Logo" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/jobs">Browse Job</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      {!user || !token ? (
                        // If not logged in, show Login & Register
                        <>
                          <div className="phone_num d-none d-xl-block">
                            <Link to="/login">Log in</Link>
                          </div>
                          <div className="d-none d-lg-block">
                            <Link className="boxed-btn3" to="/register">
                              Register
                            </Link>
                          </div>
                        </>
                      ) : (
                        // If logged in, show relevant button
                        <>
                          {userRole === 2 ? (
                            // Simple user: Show logout
                            <>
                            <div className="phone_num d-none d-xl-block">
                              <Link to="#" onClick={handleLogout}>
                                Logout
                              </Link>
                              </div>
                            <div className="phone_num  d-none d-xl-block">
                              <Link to="/profile"><i className="fa fa-4x fa-user text-white"></i></Link>
                            </div>
                            </>
                          ) : userRole === 1 ? (
                            // Job poster: Show "Poster Panel"
                            <div className="d-none d-lg-block">
                              <Link
                                className="boxed-btn3"
                                to="/employer/dashboard"
                              >
                                Employer Panel
                              </Link>
                            </div>
                          ) : userRole === 0 ? (
                            // Admin: Show "Admin Panel"
                            <div className="d-none d-lg-block">
                              <Link
                                className="boxed-btn3"
                                to="/admin/dashboard"
                              >
                                Admin Panel
                              </Link>
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
