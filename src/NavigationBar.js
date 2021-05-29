import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from './context/userContext';


const NavigationBar = ({ logout }) => {

    const ACTIVE_STYLES = {
        fontWeight: "bold",
        color: "black",
        textDecoration: "none"
    };

    const { loginUser } = useContext(UserContext);

    return (<Navbar bg="light" expand="sm">
        <Container>
            <Navbar.Brand>
                <NavLink to="/" className="fw-bolder text-primary" exact activeStyle={ACTIVE_STYLES}>Jobly</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="me-auto">
                    {
                        loginUser ? (<>
                            <NavLink className="btn btn-link" to="/companies" activeStyle={ACTIVE_STYLES}>Companies</NavLink>
                            <NavLink className="btn btn-link" to="/jobs" activeStyle={ACTIVE_STYLES}>Jobs</NavLink>
                            <NavLink className="btn btn-link" to="/profile" activeStyle={ACTIVE_STYLES}>Profile</NavLink>
                            <button className="btn btn-link" onClick={logout}>
                                Log out {`${loginUser.lastName} ${loginUser.firstName}`}
                            </button>
                        </>) : ""}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavigationBar;