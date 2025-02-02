import SingleCompany from "../Common/SingleCompany";

const HomeCompanies = () => {
  const companies = [
    {
      name: "Snack Studio",
      availablePositions: 50,
      imagePath: "assets/img/svg_icon/5.svg",
    },
    {
      name: "Tech Innovations",
      availablePositions: 50,
      imagePath: "assets/img/svg_icon/4.svg",
    },
    {
      name: "Creative Solutions",
      availablePositions: 50,
      imagePath: "assets/img/svg_icon/3.svg",
    },
    {
      name: "Design Hub",
      availablePositions: 50,
      imagePath: "assets/img/svg_icon/1.svg",
    },
  ];

  return (
    <div className="top_companies_area">
      <div className="container">
        <div className="row align-items-center mb-40">
          <div className="col-lg-6 col-md-6">
            <div className="section_title">
              <h3>Top Companies</h3>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="brouse_job text-right">
              <a href="jobs.html" className="boxed-btn4">
                Browse More Job
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          {companies.map((company, index) => (
            <div className="col-lg-4 col-xl-3 col-md-6" key={index}>
              <SingleCompany
                name={company.name}
                availablePositions={company.availablePositions}
                imagePath={company.imagePath}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCompanies;
