// source: https://github.com/ReactTraining/react-router/issues/6422
import React, {Component, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

const defaultDelay = 1000;

type DelayedRedirectProps = {
    children: Node | Array<Node>,
    to: string,
    duration: number
}

const DelayedRedirect = ({children, to, duration}: DelayedRedirectProps): Component => {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setShouldRedirect(true), duration || defaultDelay);
        return () => clearTimeout(id);
    }, [duration]);

    return shouldRedirect && to
        ? <Redirect to={to}/>
        : children || null;
};

export default DelayedRedirect;