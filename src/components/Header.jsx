import { Link } from "react-router-dom";

const Header = () => {
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
                          {/* <li>
                            <a href="#">
                              Pages <i className="ti-angle-down"></i>
                            </a>
                            <ul className="submenu">
                              <li>
                                <Link to="/candidate">Candidates</Link>
                              </li>
                              <li>
                                <Link to="/job-details">Job Details</Link>
                              </li>
                              <li>
                                <Link to="/elements">Elements</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">
                              Blog <i className="ti-angle-down"></i>
                            </a>
                            <ul className="submenu">
                              <li>
                                <Link to="/blog">Blog</Link>
                              </li>
                              <li>
                                <Link to="/single-blog">Single Blog</Link>
                              </li>
                            </ul>
                          </li> */}
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      <div className="phone_num d-none d-xl-block">
                        <Link to="/login">Log in</Link>
                      </div>
                      <div className="d-none d-lg-block">
                        <Link className="boxed-btn3" to="/post-job">
                          Post a Job
                        </Link>
                      </div>
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
