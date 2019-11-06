// @flow
import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {Home as Icon} from '@material-ui/icons';
import Screen from '../../models/screen';
import {useDispatch, useSelector} from 'react-redux';
import {getSportingEventsAsync} from '../../actions/sportingEvents';
import useSportingEventCardList from '../../libs/useSportingEventCardList';
import usePolling from '../../libs/usePolling';

const Home = (): Component => {
    const {loading, data, error} = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();

    usePolling(() => {
        dispatch(getSportingEventsAsync());
    }, 10 * 60 * 1000);

    const [list, placeholderList] = useSportingEventCardList(data);

    return (
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
                {
                    error && (
                        <Typography variant={'body1'}>
                            {`error: ${error.message}`}
                        </Typography>
                    )
                }
                <ContentLayout
                    direction={'row'}
                    justify={'flex-start'}
                    md={4}
                    sm={6}
                    spacing={1}
                    wrap={'wrap'}
                    xl={3}
                    xs={12}
                >
                    {
                        loading
                            ? placeholderList
                            : list
                    }
                </ContentLayout>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const HomePath = '/home';
export const HomeName = 'Home';
export const HomeIcon = Icon;
export const HomeScreen = Screen.create({Component: Home, Path: HomePath, Name: HomeName, Icon: HomeIcon});
export default Home;
