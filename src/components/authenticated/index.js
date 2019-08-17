import React, {Component, Fragment} from 'react';
import {useAuth} from 'react-use-auth';

const Authenticated = ({children}: {children: Node | Array<Node>}): Component => {
    const {isAuthenticated} = useAuth();

    return (
        <Fragment>
            {isAuthenticated() && children}
        </Fragment>
    );
};

export default Authenticated;