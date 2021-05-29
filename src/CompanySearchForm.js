import useSearchFields from "./hooks/useSearchFields";

const CompanySearchForm = ({ searchParams, setSearchParams }) => {

    const [formData, handleSearchChange, handleSubmit] = useSearchFields(
        searchParams,
        setSearchParams
    );

    return (
        <div className="container p-2">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-3">
                        <input
                            className="form-control"
                            type="number"
                            id="minEmployees"
                            name="minEmployees"
                            onChange={handleSearchChange}
                            placeholder="Minium Employees"
                            value={formData.minEmployees}
                        />
                    </div>
                    <div className="col-3">
                        <input
                            className="form-control"
                            type="number"
                            id="maxEmployees"
                            name="maxEmployees"
                            onChange={handleSearchChange}
                            placeholder="Maxium Employees"
                            value={formData.maxEmployees}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            type="search"
                            id="name"
                            name="name"
                            onChange={handleSearchChange}
                            placeholder="Search companies here"
                            value={formData.name}
                        /></div>
                </div>
            </form>
        </div>
    );
}

export default CompanySearchForm;