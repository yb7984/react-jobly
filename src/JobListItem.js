import { useContext } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './context/userContext';


/**
 * Job List Item Component
 * @param {*} props contains {
 * job : job information 
 * showCompany : default value is true. toggle for showing company information or not} 
 * @returns 
 */
const JobListItem = ({ job, showCompany = true }) => {
    const { loginUser, setLoginUser } = useContext(UserContext);

    const isApplied = loginUser.applications.includes(job.id);

    const handleApply = async () => {
        const result = await JoblyApi.applyToJob(loginUser.username, job.id);

        if (result.applied) {
            setLoginUser(user => ({
                ...user,
                applications: [
                    ...user.applications,
                    result.applied
                ]
            }));
        }
    };

    return (
        <div className="card m-2">
            <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <div className="card-text">
                    {showCompany ? (<div><Link to={`/companies/${job.companyHandle}`}>{job.companyName}</Link></div>) : ""}
                    <div className="row">
                        <div className="col-12 col-md-5">Salary:{job.salary}</div>
                        <div className="col-12 col-md-5">Equity:{job.equity}</div>
                        <div className="col-12 col-md-2 text-center">
                            <button className="btn btn-success btn-lg" onClick={handleApply} disabled={isApplied}>
                                {isApplied ? "Applied" : "Apply"}
                            </button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobListItem;