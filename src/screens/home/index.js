// @flow
import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {Home as Icon} from '@material-ui/icons';
import createScreen from '../../models/screen';

const Home = (): Component => (
    <ScreenLayout
        header={<AppHeader/>}
    >
        <ContentLayout
            enableBreakpointSpacing={true}
            spacing={1}
        >
            <Typography variant={'h5'}>
                {HomeName}
            </Typography>
            <Typography variant={'body1'}>
                {'Content goes here.'}
            </Typography>
        </ContentLayout>
    </ScreenLayout>
);

export const HomePath = '/home';
export const HomeName = 'Home';
export const HomeIcon = Icon;
export const HomeScreen = createScreen({Component: Home, Path: HomePath, Name: HomeName, Icon: HomeIcon});
export default Home;
