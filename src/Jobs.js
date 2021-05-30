import JobSearchForm from './JobSearchForm';
import JobList from './JobList';
import useAuth from "./hooks/useAuth";
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

const Jobs = () => {
    const { checkAuth } = useAuth();
    const [searchParams, setSearchParams] = useState({
        title: "",
        minSalary: "",
        hasEquity: ""
    });


    if (!checkAuth()) {
        return (<Redirect to="/login" />);
    }

    return (
        <div className="container-xl">
            <JobSearchForm searchParams={searchParams} setSearchParams={setSearchParams}></JobSearchForm>
            <JobList searchParams={searchParams}></JobList>
        </div>
    );
}

export default Jobs;