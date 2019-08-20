import React, {Component, Fragment} from 'react';
// import {useAuth} from 'react-use-auth';
import {useAuth0} from '../auth-provider';

const Authenticated = ({children}: {children: Node | Array<Node>}): Component => {
    const {isAuthenticated} = useAuth0();

    return (
        <Fragment>
            {isAuthenticated && children}
        </Fragment>
    );
};

export default Authenticated;