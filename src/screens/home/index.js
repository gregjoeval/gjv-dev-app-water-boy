// @flow
import React, {Component, useEffect} from 'react';
import {Typography, Link, Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {Link as RouterLink} from 'react-router-dom';
import {useAuth0} from '../../components/auth-provider';
import {fetchSportingEventsAsync} from '../../actions/sporting-events';
import {Home as Icon} from '@material-ui/icons';
import createScreen from '../../models/screen';
import {NotFoundName, NotFoundPath} from '../not-found';

const Home = (): Component => {
    const sportingEvents = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    useEffect(() => {
        dispatch(fetchSportingEventsAsync());
    }, [dispatch]);

    console.log(sportingEvents);

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
                    {`loading: ${sportingEvents.loading}`}
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
                        to={NotFoundPath}
                        underline={'hover'}
                    >
                        {NotFoundName}
                    </Link>
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const HomePath = '/home';
export const HomeName = 'Home';
export const HomeIcon = Icon;
export const HomeScreen = createScreen({Component: Home, Path: HomePath, Name: HomeName, Icon: HomeIcon});
export default Home;
