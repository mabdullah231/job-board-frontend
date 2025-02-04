import React from 'react'
import { JobDetailsHeroSection,JobDetailsContent,JobDetailsForm, JobDetailsSummary, JobDetailsShare } from '../components'

const JobDetails = () => {
  return (
    <>
        <JobDetailsHeroSection/>
        <div class="job_details_area">
            <div class="container">
                <div class="row">
                    <div className="col-md-8">
                        <JobDetailsContent/>
                        <JobDetailsForm/>
                    </div>
                    <div className="col-md-4">
                        <JobDetailsSummary/>
                        {/* <JobDetailsShare/> */}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default JobDetails