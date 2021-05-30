import CompanyListItem from './CompanyListItem';
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import Loading from './Loading';


const CompanyList = ({ searchParams = {} }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const getCompanies = async () => {
            setIsLoading(true);

            setCompanies(await JoblyApi.getCompanies(searchParams));
            
            setIsLoading(false);
        }

        getCompanies();
    }, [searchParams])

    if (isLoading) {
        return (<Loading />);
    }


    if (companies.length > 0) {
        return (
            <div>
                {companies.map(company => (
                    <CompanyListItem key={company.handle} company={company} />
                ))}
            </div>
        );
    }

    return (<div className="alert alert-danger">No company found!</div>);
}

export default CompanyList;