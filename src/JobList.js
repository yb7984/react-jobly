import JobListItem from "./JobListItem";
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import Loading from './Loading';


const JobList = ({ searchParams = {} }) => {


    const [isLoading , setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            setIsLoading(true);
            setJobs(await JoblyApi.getJobs(searchParams));
            setIsLoading(false);
        }

        getJobs();
    }, [searchParams])

    if (isLoading){
        return (<Loading />);
    }

    return (
        <div>
            {jobs.map(job => (
                <JobListItem key={job.id} job={job} />
            ))}
        </div>
    );
}
export default JobList;