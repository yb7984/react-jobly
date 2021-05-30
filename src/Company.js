import useAuth from "./hooks/useAuth";
import { Redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import JoblyApi from "./api";
import Loading from "./Loading";
import JobList from "./JobList";

const Company = () => {
    const { checkAuth } = useAuth();
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const getCompany = async () => {
            const result = await JoblyApi.getCompany(handle);

            if (result) {
                setCompany(result);
            }
        }

        getCompany();
    }, [handle]);


    if (!checkAuth) {
        return (<Redirect to="/login" />);
    }


    if (company) {
        return (
            <div className="container-xl">
                <div className="card m-2 border-0">
                    <div className="card-body">
                        <h5 className="card-title">{company.name}</h5>
                        <div className="card-text">
                            <div className="position-relative">
                                {
                                    company.logoUrl ?
                                        <img className="float-right" src={company.logoUrl} alt={company.name} /> :
                                        ""
                                }
                                <div>Employees: {company.numEmployees}</div>
                                <div>{company.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <JobList listJobs={company.jobs} />
            </div>
        );
    }
    return (<Loading />);
}

export default Company;