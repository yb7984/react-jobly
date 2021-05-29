import CompanySearchForm from './CompanySearchForm';
import CompanyList from './CompanyList';
import useAuth from "./hooks/useAuth";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Companies = () => {
    const { checkAuth } = useAuth();
    const history = useHistory();
    if (!checkAuth) {
        history.push('/login');
    }
    const [searchParams, setSearchParams] = useState({
        name: "",
        minEmployees: "",
        maxEmployees: ""
    });
    return (
        <div className="container-xl">
            <CompanySearchForm searchParams={searchParams} setSearchParams={setSearchParams}></CompanySearchForm>
            <CompanyList searchParams={searchParams} ></CompanyList>
        </div>
    );
}

export default Companies;