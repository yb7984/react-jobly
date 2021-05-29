import useAuth from "./hooks/useAuth";
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import JoblyApi from "./api";
import Loading from "./Loading";
import JobListItem from './JobListItem';

const Company = () => {
    const { checkAuth } = useAuth();
    const history = useHistory();
    if (!checkAuth) {
        history.push('/login');
    }


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

    if (company) {
        return (
            <div className="container">
                <div className="display-4">{company.name}</div>
                <div className="d-flex">
                    <div>

                        {
                            company.logoUrl ?
                                <img className="float-right" src={company.logoUrl} alt={company.name} /> :
                                ""
                        }
                        {company.description}
                    </div>
                </div>
                <div>
                    {company.jobs.map(job => (<JobListItem key={job.id} job={job} showCompany={false} />))}
                </div>
            </div>
        );
    }
    return (<Loading />);
}

export default Company;