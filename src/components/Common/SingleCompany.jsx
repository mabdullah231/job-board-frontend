import { Link } from "react-router-dom";

const SingleCompany = ({ name, availablePositions, imagePath }) => {
  
  return (
    <div className="single_company">
      <div className="thumb">
        <img src={imagePath} alt={name}  
                    style={{
              width: "100%",
              height: "100%",
              objectFit: "", // Ensures the image fills the space without distortion
              // borderRadius: "5px", // Optional: adds rounded corners for a better look
            }}/>
      </div>
      <Link to="/jobs">
        <h3>{name}</h3>
      </Link>
      <p>
        <span>{availablePositions}</span> Available position
      </p>
    </div>
  );
};

export default SingleCompany;
