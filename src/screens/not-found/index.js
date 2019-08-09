import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';

const NotFound = (): Component => (
    <ScreenLayout
        header={<AppHeader/>}
    >
        <ContentLayout
            enableBreakpointSpacing={true}
            spacing={24}
        >
            <Typography variant={'h5'}>
                {'Not Found'}
            </Typography>
            <Typography variant={'body1'}>
                {'Oops, we couldn\'t find the page you were looking for...'}
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

export default NotFound;