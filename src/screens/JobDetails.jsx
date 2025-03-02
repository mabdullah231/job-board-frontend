import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../Config/Helpers';
import { JobDetailsHeroSection, JobDetailsContent, JobDetailsForm, JobDetailsSummary } from '../components';
import Loader from '../components/Common/Loader';

const JobDetails = () => {
    const { id } = useParams(); // Get job ID from route params
    const navigate = useNavigate(); // Initialize navigate function

    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (!id) {
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
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchJobData();
    }, [id, navigate]);

    useEffect(() => {
        console.log(jobData);
    }, [jobData]);

    // Show loader while fetching data
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <JobDetailsHeroSection title={jobData && jobData.title} />
            <div className="job_details_area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <JobDetailsContent job={jobData} />
                            <JobDetailsForm jobId={jobData && jobData.id} />
                        </div>
                        <div className="col-md-4">
                            <JobDetailsSummary job={jobData} />
                            {/* <JobDetailsShare/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobDetails;