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


    return (
        <div>
            {companies.map(company => (
                <CompanyListItem key={company.handle} company={company} />
            ))}
        </div>
    );
}

export default CompanyList;