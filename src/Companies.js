import CompanySearchForm from './CompanySearchForm';
import CompanyList from './CompanyList';
import useAuth from "./hooks/useAuth";
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

/**
 * /companies route showing list of companies with search
 * @returns 
 */
const Companies = () => {
    const { checkAuth } = useAuth();
    const [searchParams, setSearchParams] = useState({
        name: "",
        minEmployees: "",
        maxEmployees: ""
    });
    if (!checkAuth()) {
        return (<Redirect to="/login" />);
    }
    return (
        <div className="container-xl">
            <CompanySearchForm searchParams={searchParams} setSearchParams={setSearchParams}></CompanySearchForm>
            <CompanyList searchParams={searchParams} ></CompanyList>
        </div>
    );
}

export default Companies;