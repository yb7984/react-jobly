import { useContext, useState } from 'react';
import useFields from './hooks/useFields';
import Loading from './Loading';
import FormInput from './FormInput';
import './ProfileForm.css';
import useFormError from './hooks/useFormError';
import UserContext from './context/userContext';
import JoblyApi from './api';
import { Redirect } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const ProfileForm = () => {
    const { checkAuth } = useAuth();

    const { loginUser, setLoginUser } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useFormError();
    const [alertMsg, setAlertMsg] = useState('');
    const [formData, handleChange] = useFields({
        username: loginUser.username,
        firstName: loginUser.firstName,
        lastName: loginUser.lastName,
        email: loginUser.email
    });
    const [isLoading, setIsLoading] = useState(false);


    if (!checkAuth) {
        return (<Redirect to="/login" />);
    }

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setAlertMsg('');
        setErrorMsg([]);

        e.preventDefault();

        try {
            let result = await JoblyApi.updateUser(formData);

            if (result) {

                setLoginUser(await JoblyApi.getCurrentUser());

                setAlertMsg('Successfully updated!')

                setIsLoading(false);
            }
        } catch (error) {
            setErrorMsg(error);
            setIsLoading(false);
        }
    }

    if (!isLoading) {

        return (
            <div className="ProfileForm mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="text-center h1">Profile</div>
                    <div className={`alert alert-success ${alertMsg.length === 0 && "d-none"}`} role="alert">
                        {alertMsg}
                    </div>
                    <div className={`alert alert-danger ${errorMsg.formErrors.length === 0 && "d-none"}`} role="alert">
                        {errorMsg.formErrors}
                    </div>
                    <p className="text-danger"></p>
                    <FormInput name="username"
                        title="Username"
                        placeholder="Enter username"
                        value={formData.username}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.username}
                        readOnly={true}
                    />

                    <FormInput name="firstName"
                        title="First Name"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.firstName}
                    />

                    <FormInput name="lastName"
                        title="Last Name"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.lastName}
                    />

                    <FormInput name="email"
                        title="Email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        required={true}
                        handleChange={handleChange}
                        errorMsg={errorMsg.fieldErrors.email}
                    />

                    <div className="mb-3 text-center">
                        <button className="btn btn-primary btn-lg" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div >);
    } else {
        return (<Loading />)
    }
}

export default ProfileForm;