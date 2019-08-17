// @flow
import React, {Component} from 'react';
import {AuthProvider} from 'react-use-auth';
import {withRouter} from 'react-router-dom';

type Props = {
    children: Node | Array<Node>,
    history?: Object
}

const AppAuthProvider = ({children, history}: Props): Component => {
    const navigate = (route) => (history || {push: () => null}).push(route);

    return (
        <AuthProvider
            auth0_client_id={process.env.REACT_APP__AUTH0__CLIENT_ID}
            auth0_domain={process.env.REACT_APP__AUTH0__DOMAIN}
            navigate={navigate}
        >
            {children}
        </AuthProvider>
    );
};

export default withRouter(AppAuthProvider);
