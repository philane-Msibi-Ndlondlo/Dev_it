import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './home';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    redirectUri={`${window.location.origin}`}>
    <Router>
      <Switch>
        
        <Route path="/home" component={Home} />
        <Route path="/" exact component={App} />
      </Switch>
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
