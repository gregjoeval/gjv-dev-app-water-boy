// @flow
import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

type Props = {};

const Home = ({}: Props): Component => (
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
        </ContentLayout>
    </ScreenLayout>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);