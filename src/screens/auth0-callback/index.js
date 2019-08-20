import React, {Component, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth} from 'react-use-auth';
import {useAuth0} from '../../components/auth-provider';

const Auth0Callback = (): Component => {
    const {isAuthenticated, handleRedirectCallback} = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            handleRedirectCallback();
        }
    }, [isAuthenticated, handleRedirectCallback]);

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
                <Typography variant={'body1'}>
                    {'This is the auth callback page, you should be redirected immediately.'}
                </Typography>
                <Typography variant={'body1'}>
                    <Link
                        component={RouterLink}
                        to={'/'}
                        underline={'hover'}
                    >
                        {'Home'}
                    </Link>
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
}

export default Auth0Callback;