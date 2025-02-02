const SingleCategory = ({ title, availablePositions }) => {
  return (
    <div className="single_catagory">
      <a href="jobs.html">
        <h4>{title}</h4>
      </a>
      <p>
        <span>{availablePositions}</span> Available position
      </p>
    </div>
  );
};

export default SingleCategory;
