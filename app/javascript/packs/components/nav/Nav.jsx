import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import authContext from '../../context/index.jsx';
import Form from '../Form/Form.jsx';
import FilterButtonGrupp from '../filterButtonGroupp/filterButtonGrupp.jsx';
import Items from '../Items/Items.jsx';
import SignUp from '../Form/SignUp.jsx';
import SignIn from '../Form/SignIn.jsx';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation();
  return (
    user && user.userId ? children : <Navigate to="/signin" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userId) {
      auth.logIn();
    } else {
      auth.logOut();
    }
  });
  const handler = () => {
    auth.logOut();
    navigate('/signin', { from: location });
  };
  return (
    auth.logedIn
      ? <button type="button" className="btn btn-link" onClick={handler}>SignOut</button>
      : <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
  );
};

const Nav = () => {
  return (
    <div className="d-flex flex-column h-100 overflow-hidden">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/signin">Signin</Link>
              </li>
              <li className="nav-item">
                <AuthButton />
              </li>
            </ul>
          </div>
          </div>
          
        </nav>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <PrivateRoute>
                <h1>TODO LIST</h1>
                <Form />
                <FilterButtonGrupp />
                 <Items />
              </PrivateRoute>)}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />}  />
        </Routes>
      </Router>
    </div>
  );
};

export default Nav;