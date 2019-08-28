import React, {Component, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography, CircularProgress} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth0} from '../../components/auth-provider';
import {HomePath} from '../home';

const Auth0Callback = (): Component => {
    const {loading, isAuthenticated, getTokenSilently} = useAuth0();

    useEffect(() => {
        if (isAuthenticated && getTokenSilently) {
            getTokenSilently({});
        }
    }, [isAuthenticated, getTokenSilently]);

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {'Auth0 Callback Page'}
                </Typography>
                {
                    loading && (
                        <CircularProgress/>
                    )
                }
                {
                    isAuthenticated && (
                        <Typography>
                            {'isAuthenticated'}
                        </Typography>
                    )
                }
                <Typography variant={'body1'}>
                    {'This is the auth callback page, you should be redirected immediately.'}
                </Typography>
                <Typography variant={'body1'}>
                    <Link
                        component={RouterLink}
                        to={HomePath}
                        underline={'hover'}
                    >
                        {'Home'}
                    </Link>
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
};

export default Auth0Callback;
export const Auth0CallbackPath = '/auth0_callback';