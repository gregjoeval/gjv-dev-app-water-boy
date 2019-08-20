// @flow
import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth} from 'react-use-auth';
import {useAuth0} from '../../components/auth-provider';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

type Props = {};

const Secret = ({}: Props): Component => {
    const {user} = useAuth0();
    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {'Secret'}
                </Typography>
                <Typography variant={'body1'}>
                    {'This is the secret page.'}
                </Typography>
                <Typography variant={'body1'}>
                    {'Secrets go here.'}
                </Typography>
                <Typography variant={'body1'}>
                    {JSON.stringify(user)}
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Secret);