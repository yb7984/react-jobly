import JobListItem from "./JobListItem";
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import Loading from './Loading';


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