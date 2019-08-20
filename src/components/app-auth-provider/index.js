// @flow
import React, {Component} from 'react';
// import {AuthProvider} from 'react-use-auth';
import {withRouter} from 'react-router-dom';
import {Auth0Provider} from '../auth-provider';

type Props = {
    children: Node | Array<Node>,
    history?: Object
}

// const AppAuthProvider = ({children, history}: Props): Component => {
//     const clientId = process.env.REACT_APP__AUTH0__CLIENT_ID;
//     const domain = process.env.REACT_APP__AUTH0__DOMAIN;
//     const params = {
//         domain: domain,
//         clientID: clientId,
//         redirectUri: `${window.location.origin}/auth0_callback`,
//         audience: `https://${domain}/api/v2/`,
//         responseType: 'token id_token',
//         scope: 'openid profile email',
//         nonce: 'somevalue'
//     };
//
//     const navigate = (route) => (history || {push: () => null}).push(route);
//
//     return (
//         <AuthProvider
//             auth0_client_id={clientId}
//             auth0_domain={domain}
//             auth0_params={params}
//             navigate={navigate}
//         >
//             {children}
//         </AuthProvider>
//     );
// };

const AppAuthProvider = ({children, history}: Props): Component => {
    const clientId = process.env.REACT_APP__AUTH0__CLIENT_ID;
    const domain = process.env.REACT_APP__AUTH0__DOMAIN;
    // const params = {
    //     domain: domain,
    //     clientID: clientId,
    //     redirectUri: `${window.location.origin}/auth0_callback`,
    //     audience: `https://${domain}/api/v2/`,
    //     responseType: 'token id_token',
    //     scope: 'openid profile email',
    // };

    const navigate = (route) => (history || {push: () => null}).push(route);

    return (
        <Auth0Provider
            clientId={clientId}
            domain={domain}
            navigate={navigate}
            redirectUri={`${window.location.origin}/auth0_callback`}
        >
            {children}
        </Auth0Provider>
    );
};

export default withRouter(AppAuthProvider);
