// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Auth0Provider} from '../auth-provider';

type Props = {
    children: Node | Array<Node>,
    history?: Object
}

const AppAuthProvider = ({children, history}: Props): Component => {
    const clientId = process.env.REACT_APP__AUTH0__CLIENT_ID;
    const domain = process.env.REACT_APP__AUTH0__DOMAIN;

    const navigate = (route) => (history || {push: () => null}).push(route);

    return (
        <Auth0Provider
            client_id={clientId}
            domain={domain}
            onRedirectCallback={navigate}
            redirect_uri={`${window.location.origin}/auth0_callback`}
        >
            {children}
        </Auth0Provider>
    );
};

export default withRouter(AppAuthProvider);
