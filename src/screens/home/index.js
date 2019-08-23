// @flow
import React, {Component} from 'react';
import {Typography, Link, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {Link as RouterLink} from 'react-router-dom';
import {useAuth0} from '../../components/auth-provider';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({});

type Props = {};

// TODO: remove next line and actually utilize state variables
// eslint-disable-next-line no-empty-pattern
const Home = ({}: Props): Component => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {'Index'}
                </Typography>
                <Typography variant={'body1'}>
                    {'This is the index page.'}
                </Typography>
                <Typography variant={'body1'}>
                    {'Content goes here.'}
                </Typography>
                <Typography variant={'body1'}>
                    {`isAuthenticated: ${isAuthenticated}`}
                </Typography>
                <Button
                    href={null}
                    onClick={() => loginWithRedirect({})}
                >
                    {'login'}
                </Button>
                <Button
                    href={null}
                    onClick={() => logout({})}
                >
                    {'logout'}
                </Button>
                <Typography variant={'body1'}>
                    <Link
                        component={RouterLink}
                        to={'/not-found'}
                        underline={'hover'}
                    >
                        {'Not Found'}
                    </Link>
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);