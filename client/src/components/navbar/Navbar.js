import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const {
        loginWithRedirect,
        isAuthenticated,
        user,
        logout,
        isLoading,
        error,
      } = useAuth0();
    return (
        <header>
        <h1>Dev_it</h1>
        <nav>
          <ul>
            <li>
              <Link to='/' className="link">My Questions</Link>
            </li>
            <li>
              <Link to='/' className="link">Feedback</Link>
            </li>
            <li>
              <Link to='/' className="link">
                <img src={user.picture} className="userpic" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Navbar
