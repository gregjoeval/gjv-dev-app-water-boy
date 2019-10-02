// @flow
import React, {Component} from 'react';
import {Auth0Provider} from '../auth-provider';
import {useSelector} from 'react-redux';

type Props = {
    children: Node | Array<Node>
}

const AppAuthProvider = ({children}: Props): Component => {
    const {clientId, domain, waterBoyApiUri} = useSelector(state => state.config);

    return (
        <Auth0Provider
            audience={waterBoyApiUri}
            client_id={clientId}
            domain={domain}
            redirect_uri={`${window.location.origin}/auth0_callback`}
        >
            {children}
        </Auth0Provider>
    );
};

export default AppAuthProvider;
