// copied from https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0
import React, {Component, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {useAuth0} from '../../components/auth-provider';

type PrivateRouteProps = {
    component: Component,
    path: string
}

const PrivateRoute = ({component: ComponentInstance, path, ...rest}: PrivateRouteProps) => {
    const {loading, isAuthenticated, loginWithRedirect} = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        loginWithRedirect({appState: {targetUrl: path}});
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = props => isAuthenticated === true ? <ComponentInstance {...props} /> : null;

    return (
        <Route
            path={path}
            render={render}
            {...rest}
        />
    );
};

export default PrivateRoute;