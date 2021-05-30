import JobListItem from "./JobListItem";
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import Loading from './Loading';

/**
 * Job List Component
 * Fitler jobs by searchParams if listJobs is null
 * List jobs in listJobs if listJobs is not null
 * @param {*} props {
 * searchParams : seachParams can contain {title , minSalary , hasEquity}
 * listJobs : default value is null. 
 * }
 * @returns 
 */
const JobList = ({ searchParams = {}, listJobs = null }) => {

    const [isLoading, setIsLoading] = useState(!listJobs);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            setIsLoading(true);
            setJobs(await JoblyApi.getJobs(searchParams));
            setIsLoading(false);
        }
        if (listJobs === null) {
            getJobs();
        }
    }, [searchParams, listJobs])

    if (isLoading) {
        return (<Loading />);
    }

    const list = listJobs || jobs;

    if (list.length > 0) {
        return (
            <div>
                {list.map(job => (
                    <JobListItem key={job.id} job={job} />
                ))}
            </div>
        );
    }

    return (<div className="alert alert-danger">No job found!</div>);
}
export default JobList;