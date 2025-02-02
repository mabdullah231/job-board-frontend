
const SingleCompany = ({ name, availablePositions, imagePath }) => {
  return (
    <div className="single_company">
      <div className="thumb">
        <img src={imagePath} alt={name} />
      </div>
      <a href="jobs.html">
        <h3>{name}</h3>
      </a>
      <p>
        <span>{availablePositions}</span> Available position
      </p>
    </div>
  );
};

export default SingleCompany;
