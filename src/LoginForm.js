import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFields from './hooks/useFields';
import './LoginForm.css';
import Loading from './Loading';
import FormInput from './FormInput';

const LoginForm = ({ login }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, handleChange] = useFields({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        setIsLoading(true);

        e.preventDefault();

        let result = await login(formData.username, formData.password);

        if (result === true) {
            setIsLoading(false);

            history.push('/');
        } else {
            setErrorMsg('Invalid username/password');
            setIsLoading(false);
        }
    }

    if (!isLoading) {

        return (
            <div className="LoginForm d-flex flex-column justify-content-center">
                <h1 className="text-center">Login</h1>
                <p className="text-danger">{errorMsg}</p>
                <form className="text-left " onSubmit={handleSubmit}>
                    <FormInput name="username"
                        title="Username"
                        placeholder="Enter username"
                        value={formData.username}
                        required={true}
                        handleChange={handleChange}
                    />


                    <FormInput name="password"
                        title="Password"
                        placeholder="Enter password"
                        value={formData.password}
                        required={true}
                        type="password"
                        handleChange={handleChange}
                    />

                    <div className="mb-3 text-center">
                        <button className="btn btn-primary btn-lg" type="submit">
                            Login
                        </button>
                    </div>

                    <div className="mb-3 text-center form-text">
                        No account? just <Link to="/signup">Signup</Link>.
                    </div>
                </form>
            </div >);
    } else {
        return (<Loading />)
    }
}

export default LoginForm;