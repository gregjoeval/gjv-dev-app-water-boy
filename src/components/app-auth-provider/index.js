// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Auth0Provider} from '../auth-provider';
import {useSelector} from 'react-redux';

type Props = {
    children: Node | Array<Node>,
    history?: Object
}

const AppAuthProvider = ({children, history}: Props): Component => {

    const {clientId, domain, waterBoyApiUri} = useSelector(state => state.config);

    const navigate = (route) => (history || {push: () => null}).push(route);

    return (
        <Auth0Provider
            audience={waterBoyApiUri}
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
