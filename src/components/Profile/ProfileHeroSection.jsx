import React from 'react';

const ProfileHeroSection = ({title}) => {
  return (
    <div className="bradcam_area bradcam_bg_1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="bradcam_text">
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroSection;