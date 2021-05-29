import JobSearchForm from './JobSearchForm';
import JobList from './JobList';
import useAuth from "./hooks/useAuth";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Jobs = () => {
    const { checkAuth } = useAuth();
    const history = useHistory();
    if (!checkAuth) {
        history.push('/login');
    }


    const [searchParams, setSearchParams] = useState({
        title: "",
        minSalary: "",
        hasEquity: ""
    });

    return (
        <div className="container">
            <JobSearchForm searchParams={searchParams} setSearchParams={setSearchParams}></JobSearchForm>
            <JobList searchParams={searchParams}></JobList>
        </div>
    );
}

export default Jobs;