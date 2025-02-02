import SingleCategory from "../Common/SingleCategory";

const HomeCategories = () => {
  const categories = [
    {
      title: "Design & Creative",
      availablePositions: 50,
    },
    {
      title: "Marketing",
      availablePositions: 50,
    },
    {
      title: "Telemarketing",
      availablePositions: 50,
    },
    {
      title: "Software & Web",
      availablePositions: 50,
    },
    {
      title: "Administration",
      availablePositions: 50,
    },
    {
      title: "Teaching & Education",
      availablePositions: 50,
    },
    {
      title: "Engineering",
      availablePositions: 50,
    },
    {
      title: "Garments / Textile",
      availablePositions: 50,
    },
  ];

  return (
    <div className="popular_catagory_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section_title mb-40">
              <h3>Popular Categories</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-lg-4 col-xl-3 col-md-6" key={index}>
              <SingleCategory
                title={category.title}
                availablePositions={category.availablePositions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
