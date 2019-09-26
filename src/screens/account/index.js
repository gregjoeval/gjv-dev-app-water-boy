// @flow
import React, {Component} from 'react';
import {Typography, Avatar} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {useAuth0} from '../../components/auth-provider';
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons';
import createScreen from '../../models/screen';
import User from '../../models/user';

const Account = (): Component => {
    const {user} = useAuth0();
    const userModel = User.create(user);
    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={1}
            >
                <Typography variant={'h5'}>
                    {AccountName}
                </Typography>
                <ContentLayout alignItems={'center'}>
                    <Avatar
                        alt={'account'}
                        src={userModel.picture}
                    />
                </ContentLayout>
                <Typography variant={'body1'}>
                    {`Name: ${userModel.name}`}
                </Typography>
                <Typography variant={'body1'}>
                    {`Email: ${userModel.email}`}
                </Typography>
                <Typography variant={'body1'}>
                    {`Nickname: ${userModel.nickname}`}
                </Typography>
                <Typography variant={'body1'}>
                    {`Sub: ${userModel.sub}`}
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
