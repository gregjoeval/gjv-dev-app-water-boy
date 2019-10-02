// @flow
import React, {Component, useEffect} from 'react';
import {Typography, CircularProgress} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth0} from '../../components/auth-provider';
import Screen from '../../models/screen';
import {HomePath} from '../home';
import DelayedRedirect from '../../components/delayed-redirect';

const AuthCallback = (): Component => {
    const {loading, isAuthenticated, getTokenSilently} = useAuth0();

    useEffect(() => {
        if (isAuthenticated && getTokenSilently) {
            getTokenSilently({});
        }
    }, [isAuthenticated, getTokenSilently]);

    return (
        <DelayedRedirect
            duration={3000}
            to={HomePath}
        >
            <ScreenLayout
                header={<AppHeader/>}
            >
                <ContentLayout
                    enableBreakpointSpacing={true}
                    spacing={1}
                >
                    <Typography variant={'h5'}>
                        {AuthCallbackName}
                    </Typography>
                    {
                        loading && (
                            <CircularProgress/>
                        )
                    }
                    <Typography variant={'body1'}>
                        {'You will be redirected shortly.'}
                    </Typography>
                </ContentLayout>
            </ScreenLayout>
        </DelayedRedirect>
    );
};

export const AuthCallbackPath = '/auth0_callback';
export const AuthCallbackName = 'Auth Callback';
export const AuthCallbackScreen = Screen.create({Component: AuthCallback, Path: AuthCallbackPath, Name: AuthCallbackName});
export default AuthCallback;
