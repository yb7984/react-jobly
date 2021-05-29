import NavigationBar from './NavigationBar';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';
import { Switch, Route, useHistory } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import UserContext from './context/userContext';
import JoblyApi from './api';
import Loading from './Loading';

//add the using fontawesome
library.add(faSpinner);

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


  //load login user information
  const setUser = async () => {
    if (isLoading) {

      const user = await JoblyApi.getCurrentUser();

      if (user) {
        setLoginUser(user);
      } else {
        setLoginUser(null);
      }

      setIsLoading(false);
    }
  }

  setUser();


  const login = async (username, password) => {

    const result = await JoblyApi.login(username, password);

    if (result === true) {
      setLoginUser(await JoblyApi.getCurrentUser());

      return true;
    }

    return false;
  }

  const signup = async (user) => {


    const result = await JoblyApi.register(user);

    if (result === true) {
      setLoginUser(await JoblyApi.getCurrentUser());

      return true;
    }

    return false;
  }

  const logout = () => {
    JoblyApi.token = "";
    setLoginUser(null);

    history.push('/');
  }

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ loginUser, setLoginUser }}>
        <NavigationBar logout={logout} />
        <Switch>
          <Route path="/companies/:handle">
            <Company />
          </Route>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/profile">
            <ProfileForm />
          </Route>
          <Route path="/signup">
            <SignUpForm signup={signup} />
          </Route>
          <Route path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            404
        </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
