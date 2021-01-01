import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

function Home() {

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    return isAuthenticated ? (
        <div>
        <h3>User</h3>
        <h3>{user.name}</h3>
        <button onClick={logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
    ) : (
        <h1>Not isAuthenticated</h1>
    )
}

export default Home
