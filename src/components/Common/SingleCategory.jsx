import { Link } from "react-router-dom";

const SingleCategory = ({ title, availablePositions }) => {
  
  return (
    <div className="single_catagory">
      <Link to="/jobs">
        <h4>{title}</h4>
      </Link>
      <p>
        <span>{availablePositions}</span> Available position
      </p>
    </div>
  );
};

export default SingleCategory;
