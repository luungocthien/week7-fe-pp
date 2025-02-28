import {Link} from "react-router-dom";

const JobListing = ({job}) => {
  return (
    <>
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
    </div>
    <Link to={`/jobs/${job.id}`}>View Job</Link>
    </>
  );
};

export default JobListing;
