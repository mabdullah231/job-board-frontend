import React, { useEffect, useState  } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../Config/Helpers';

import { JobDetailsHeroSection,JobDetailsContent,JobDetailsForm, JobDetailsSummary, JobDetailsShare } from '../components'

const JobDetails = () => {
    const { id } = useParams(); // Get job ID from route params
    const navigate = useNavigate(); // Initialize navigate function

    const [jobData, setJobData] = useState(null);
    useEffect(() => {
        if(!id){
            navigate('/');
            return;
        }

        const fetchJobData = async () => {
          try {
            const response = await axios.get(`${Helpers.apiUrl}data/jobpost/${id}`);
            setJobData(response.data);
          } catch (error) {
            console.error("Error fetching job data:", error);
          } finally {
          }
        };
    
        fetchJobData();
      }, [id]);

      useEffect(() => {
        console.log(jobData);
      
      }, [jobData])
      
  return (
    <>
        <JobDetailsHeroSection title={jobData && jobData.title}/>
        <div class="job_details_area">
            <div class="container">
                <div class="row">
                    <div className="col-md-8">
                        <JobDetailsContent job={ jobData && jobData}/>
                        <JobDetailsForm/>
                    </div>
                    <div className="col-md-4">
                        <JobDetailsSummary job={ jobData && jobData}/>
                        {/* <JobDetailsShare/> */}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default JobDetails