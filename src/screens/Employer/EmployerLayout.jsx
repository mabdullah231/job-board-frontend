import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers.js";
import axios from "axios";

const EmployerLayout = () => {
  const user = Helpers.authUser; // Get stored user object
  const token = Helpers.getItem("token"); // Get stored token
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.bootstrapLoaded) {
      window.bootstrapLoaded = true; // Prevents multiple loads

      Helpers.loadScript("popper.min.js", true)
        .then(() => Helpers.loadScript("chart.min.js", true))
        .then(() => Helpers.loadScript("bootstrap.min.js", true))
        .then(() => Helpers.loadScript("app.js", true));
    }
  }, []);
  const location = useLocation();
  useEffect(() => {
    Helpers.toggleCSS();
  }, [location.pathname]);

  const navItems = [
    { name: "Overview", path: "/employer/dashboard", icon: "fas fa-home" },
    { name: "Company", path: "/employer/company", icon: "fas fa-building" },
    {
      name: "Job Posts",
      path: "/employer/job_posts",
      icon: "fas fa-briefcase",
    },
    {
      name: "Job Applications",
      path: "/employer/job_applications",
      icon: "fas fa-file-alt",
    },
  ];

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
        navigate("/login"); // Redirect to login page
        Helpers.refresh()
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
    <div className="app-wrapper">
      <header className="app-header ">
        <div className="app-header-inner">
          <div className="container-fluid py-2">
            <div className="app-header-content">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <a
                    id="sidepanel-toggler"
                    className="sidepanel-toggler d-inline-block d-xl-none"
                    href="#"
                  >
                    <i className="fas fa-bars"></i>
                  </a>
                </div>
                <div className="search-mobile-trigger d-sm-none col">
                  <i className="fas fa-search"></i>
                </div>
                {/* <div className="app-search-box col">
                  <form className="app-search-form">
                    <input
                      type="text"
                      placeholder="Search..."
                      name="search"
                      className="form-control search-input"
                    />
                    <button
                      type="submit"
                      className="btn search-btn btn-primary"
                      value="Search"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div> */}
                <div className="app-utilities col-auto">
                  <div className="app-utility-item app-notifications-dropdown dropdown">
                    <a
                      className="dropdown-toggle no-toggle-arrow"
                      id="notifications-dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                      title="Notifications"
                    >
                      <i className="fas fa-bell"></i>
                      <span className="icon-badge">3</span>
                    </a>
                    <div
                      className="dropdown-menu p-0"
                      aria-labelledby="notifications-dropdown-toggle"
                    >
                      <div className="dropdown-menu-header p-3">
                        <h5 className="dropdown-menu-title mb-0">
                          Notifications
                        </h5>
                      </div>
                      <div className="dropdown-menu-content">
                        <div className="item p-3">
                          <div className="row gx-2 justify-content-between align-items-center">
                            <div className="col-auto">
                              <i className="fas fa-user-circle fa-2x"></i>
                            </div>
                            <div className="col">
                              <div className="info">
                                <div className="desc">
                                  Amy shared a file with you. Lorem ipsum dolor
                                  sit amet, consectetur adipiscing elit.
                                </div>
                                <div className="meta">2 hrs ago</div>
                              </div>
                            </div>
                          </div>
                          <a
                            className="link-mask"
                            href="notifications.html"
                          ></a>
                        </div>
                        {/* Add more notification items here */}
                      </div>
                      <div className="dropdown-menu-footer p-2 text-center">
                        <a href="notifications.html">View all</a>
                      </div>
                    </div>
                  </div>
                  <div className="app-utility-item">
                    <a href="settings.html" title="Settings">
                      <i className="fas fa-cog"></i>
                    </a>
                  </div>
                  <div className="app-utility-item app-user-dropdown dropdown">
                    <a
                      className="dropdown-toggle"
                      id="user-dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-circle fa-2x"></i>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="user-dropdown-toggle"
                    >
                      <li>
                        <a className="dropdown-item" href="account.html">
                          Account
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="settings.html">
                          Settings
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={handleLogout}
                          style={{ cursor: "pointer" }}
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="app-sidepanel" className="app-sidepanel">
        <div id="sidepanel-drop" className="sidepanel-drop"></div>
        <div className="sidepanel-inner d-flex flex-column">
          <a
            href="#"
            id="sidepanel-close"
            className="sidepanel-close d-xl-none"
          >
            &times;
          </a>
          <div className="app-branding">
            <a className="app-logo" href="/">
              <img
                className="logo-icon"
                src={`${Helpers.ASSETS_IMAGES_PATH}/logo-small.png`}
                alt="logo"
              />
              <span className="logo-text mx-2">Employer Panel</span>
            </a>
          </div>
          <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
            <ul
              className="app-menu list-unstyled accordion"
              id="menu-accordion"
            >
              {navItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    className={`nav-link d-flex align-items-center ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    to={item.path}
                  >
                    <span className="nav-icon ">
                      <i className={item.icon}></i>
                    </span>
                    <span className="nav-link-text">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="app-sidepanel-footer">
            <nav className="app-nav app-nav-footer">
              <ul className="app-menu footer-menu list-unstyled">
                <li className="nav-item">
                  <a className="nav-link" href="settings.html">
                    <span className="nav-icon">
                      <i className="fas fa-cog"></i>
                    </span>
                    <span className="nav-link-text">Settings</span>
                  </a>
                </li>
                {/* Add more footer menu items here */}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl pt-2">
          <Outlet />
        </div>
      </div>

      <footer className="app-footer">
        <div className="container text-center py-3">
          <small className="copyright">
            Designed with <span className="sr-only">love</span>
            <i
              className="fas fa-heart"
              style={{ color: "#fb866a" }}
            ></i> by{" "}
            <a
              className="app-link"
              href="http://themes.3rdwavemedia.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xiaoying Riley
            </a>{" "}
            for developers
          </small>
        </div>
      </footer>
    </div>
  );
};

export default EmployerLayout;
