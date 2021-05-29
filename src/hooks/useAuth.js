import { useContext } from "react";
import UserContext from "../context/userContext";
import { useParams } from 'react-router-dom';
const useAuth = (authType = "login") => {

    const { loginUser } = useContext(UserContext);
    const { username } = useParams()

    const checkAuth = () => {

        if (authType === "none") {
            //not required login
            return true;
        }

        if (!loginUser) {
            //not login
            return false;
        }

        if (authType === "admin") {
            return loginUser.isAdmin;
        }

        if (authType === "right-user") {
            if (loginUser.isAdmin === true) {
                return true;
            }

            if (loginUser.username === username) {
                return true
            }

            return false;
        }

        if (authType === "login") {
            return !!loginUser;
        }

        return false;

    }
    return { loginUser, checkAuth };
}

export default useAuth;