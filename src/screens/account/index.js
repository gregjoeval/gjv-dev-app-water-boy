// @flow
import React, {Component} from 'react';
import {Typography, Button, Avatar} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth0} from '../../components/auth-provider';
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons';
import createScreen from '../../models/screen';
import User from '../../models/user';

const Account = (): Component => {
    const {user, logout} = useAuth0();
    const userModel = User.create(user);
    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {AccountName}
                </Typography>
                <Button
                    onClick={() => logout({})}
                >
                    {'logout'}
                </Button>
                <Typography variant={'body1'}>
                    {userModel.name}
                </Typography>
                <Typography variant={'body1'}>
                    {userModel.email}
                </Typography>
                <Typography variant={'body1'}>
                    {userModel.nickname}
                </Typography>
                <Avatar
                    alt={'account'}
                    src={userModel.picture}
                />
                <Typography variant={'body1'}>
                    {userModel.sub}
                </Typography>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const AccountPath = '/account';
export const AccountName = 'Account';
export const AccountIcon = AccountCircleIcon;
export const AccountScreen = createScreen({Component: Account, Path: AccountPath, Name: AccountName, Icon: AccountIcon, hasAuth: true});
export default Account;
