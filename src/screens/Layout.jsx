import { useEffect, useState, useRef } from "react";
import Helpers from "../Config/Helpers.js";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, Footer } from "../components";
// import PageLoader from "../Components/Loader/PageLoader";

const Layout = () => {
  const location = useLocation();
    const [loader, setLoader] = useState(true);


  useEffect(() => {
    Helpers.toggleCSS();
  }, [location.pathname]);


  useEffect(() => {
    Helpers.loadScript("modernizr-3.5.0.min.js") // Load Modernizr first
      .then(() => Helpers.loadScript("jquery-1.12.4.min.js")) // Load jQuery next
      .then(() => Helpers.loadScript("popper.min.js"))
      .then(() => Helpers.loadScript("bootstrap.min.js"))
      .then(() => Helpers.loadScript("owl.carousel.min.js"))
      .then(() => Helpers.loadScript("isotope.pkgd.min.js"))
      .then(() => Helpers.loadScript("ajax-form.js"))
      .then(() => Helpers.loadScript("waypoints.min.js"))
      .then(() => Helpers.loadScript("jquery.counterup.min.js"))
      // .then(() => Helpers.loadScript("jquery-ui.js"))
      .then(() => Helpers.loadScript("imagesloaded.pkgd.min.js"))
      .then(() => Helpers.loadScript("scrollIt.js"))
      .then(() => Helpers.loadScript("jquery.scrollUp.min.js"))
      .then(() => Helpers.loadScript("wow.min.js"))
      .then(() => Helpers.loadScript("nice-select.min.js"))
      .then(() => Helpers.loadScript("jquery.slicknav.min.js"))
      .then(() => Helpers.loadScript("jquery.magnific-popup.min.js"))
      .then(() => Helpers.loadScript("plugins.js"))
      .then(() => Helpers.loadScript("range.js"))
      // .then(() => Helpers.loadScript("gijgo.min.js"))
      .then(() => Helpers.loadScript("jquery.ajaxchimp.min.js"))
      .then(() => Helpers.loadScript("jquery.form.js"))
      .then(() => Helpers.loadScript("jquery.validate.min.js")) // Ensure validate.js loads before contact.js
      .then(() => Helpers.loadScript("contact.js")) // Now contact.js can use $.validator.addMethod
      .then(() => Helpers.loadScript("mail-script.js"))
      .then(() => Helpers.loadScript("main.js"))
      .then(() => {
        $("#slider-range").slider({
          range: true,
          min: 0,
          max: 24600,
          values: [750, 24600],
          slide: function (event, ui) {
            $("#amount").val(
              "$" + ui.values[0] + " - $" + ui.values[1] + "/ Year"
            );
          },
        });
        $("#amount").val(
          "$" +
            $("#slider-range").slider("values", 0) +
            " - $" +
            $("#slider-range").slider("values", 1) +
            "/ Year"
        );
      }).then(() =>
          setTimeout(() => {
              setLoader(false);
          }, 1000)); // Load main.js last
  }, [location]);

  return (
    <div>
      {/* {loader ? (
                <div>
                  
                </div>
            ) : (
              <> */}
      <Header />
      <Outlet />
      <Footer />
              {/* </>
            )} */}
      {/* <div className="page-wrapper">
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
        <header className="main-header main-header-one">
          <div className="header-lower">
            <div className="main-menu__wrapper">
              <div className="inner-container d-flex align-items-center justify-content-between">
                <div className="main-header-one__logo-box">
                  <Link to="/">
                    <img src="app/logo-duo.png" alt="" className="w200" />
                  </Link>
                </div>
                <div className="nav-outer">
                  <nav className="main-menu show navbar-expand-md">
                    <div className="navbar-header">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                    </div>
                    <div
                      className="navbar-collapse collapse clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation clearfix">
                        <li>
                          <a
                            onClick={() => handleNavigation("homeDiv")}
                            href="#homeDiv"
                          >
                            Home
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNavigation("aboutDiv")}>
                            About
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNavigation("contactDiv")}>
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="outer-box d-flex align-items-center">
                  <ul className="main-header__login-sing-up">
                    <li>
                      <Link className="main-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="main-link" to="/register">
                        Join Us
                      </Link>
                    </li>
                  </ul>
                  <div className="mobile-nav-toggler">
                    <span className="icon-menu"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobile-menu">
            <div className="menu-backdrop"></div>
            <div className="close-btn">
              <span className="icon far fa-times fa-fw"></span>
            </div>
            <nav className="menu-box">
              <div className="nav-logo">
                <Link to="/">
                  <img src="assets/images/logo-2.png" alt="" title="" />
                </Link>
              </div>
              <div className="search-box">
                <form method="" action="#">
                  <div className="form-group">
                    <input
                      type="search"
                      name="search-field"
                      value=""
                      placeholder="SEARCH HERE"
                      required
                    />
                    <button type="submit">
                      <span className="icon far fa-search fa-fw"></span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="menu-outer"></div>
            </nav>
          </div>
        </header>
        <Outlet />
        <footer id="contactDiv" className="main-footer">
          <div className="main-footer__shape-1 img-bounce"></div>
          <div className="main-footer__top">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="footer-widget__column footer-widget__about">
                    <div className="footer-widget__logo">
                      <Link to="/">
                        <img src="app/logo-duo.png" className="w200" alt="" />
                      </Link>
                    </div>
                    <p className="footer-widget__about-text">
                      A Magical Tool to Optimize you content for the first know
                      who you're targeting. Identify your target audience.
                    </p>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6">
                  <div className="footer-widget__column footer-widget__company">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">Company</h3>
                    </div>
                    <div className="footer-widget__company-list-box">
                      <ul className="footer-widget__company-list">
                        <li>
                          <a href="/login">Sign in</a>
                        </li>
                        <li>
                          <a href="/register">Register</a>
                        </li>
                        <li>
                          <a onClick={() => handleNavigation("aboutDiv")}>
                            Pricing
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNavigation("aboutDiv")}>
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleNavigation("aboutDiv")}>
                            Career
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-6 col-md-6">
                  <div className="footer-widget__column footer-widget__resources">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">Resources</h3>
                    </div>
                    <div className="footer-widget__resources-list-box">
                      <ul className="footer-widget__resources-list">
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            AI writer
                          </a>
                        </li>
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            Businesses AI
                          </a>
                        </li>
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            AI Blog writer
                          </a>
                        </li>
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            AI Content Creator
                          </a>
                        </li>
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            AI Copy
                          </a>
                        </li>
                        <li>
                          <a onClick={() => scrollToSection("aboutDiv")}>
                            Article write
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <div className="footer-widget__column footer-widget__newsletter">
                    <div className="footer-widget__title-box">
                      <h3 className="footer-widget__title">Resources</h3>
                    </div>
                    <div className="footer-widget__email-form">
                      <form className="footer-widget__email-box">
                        <div className="footer-widget__email-input-box">
                          <input
                            type="email"
                            placeholder="Inter Your Email"
                            name="email"
                          />
                        </div>
                        <button type="submit" className="footer-widget__btn">
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </form>
                    </div>
                    <div className="site-footer__social">
                      <a href="#">
                        <i className="icon-social-1"></i>
                      </a>
                      <a href="#">
                        <i className="icon-social-2"></i>
                      </a>
                      <a href="#">
                        <i className="icon-social-3"></i>
                      </a>
                      <a href="#">
                        <i className="icon-social-4"></i>
                      </a>
                      <a href="#">
                        <i className="icon-social-5"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-footer__bottom">
            <div className="container">
              <div className="main-footer__bottom-inner">
                <p className="main-footer__bottom-text">
                  Copyright © 2024. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div> */}

    </div>
  );
};

export default Layout;
