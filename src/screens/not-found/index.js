// @flow
import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import createScreen from '../../models/screen';
import {HomeName, HomePath} from '../home';

const NotFound = (): Component => (
    <ScreenLayout
        header={<AppHeader/>}
    >
        <ContentLayout
            enableBreakpointSpacing={true}
            spacing={24}
        >
            <Typography variant={'h5'}>
                {NotFoundName}
            </Typography>
            <Typography variant={'body1'}>
                {'Oops, we couldn\'t find the page you were looking for...'}
            </Typography>
            <Typography variant={'body1'}>
                <Link
                    component={RouterLink}
                    to={HomePath}
                    underline={'hover'}
                >
                    {HomeName}
                </Link>
            </Typography>
        </ContentLayout>
    </ScreenLayout>
);

export const NotFoundPath = '/not-found';
export const NotFoundName = 'Not Found';
export const NotFoundScreen = createScreen({Component: NotFound, Path: NotFoundPath, Name: NotFoundName});
export default NotFound;